using AutoMapper;
using AutoMapper.QueryableExtensions;
using ExpenseTrackerAPI.Core;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<ExpenseController> _logger;
        private readonly IMapper _mapper;

        public ExpenseController(DataContext context, ILogger<ExpenseController> logger, IMapper mapper)
        {
            _context = context;
            _logger = logger;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> ExpenseList([FromQuery]QueryParams queryParams)
        {
            var expensesQuery = _context.Expenses
                .Include(x => x.Category)
                .Include(x => x.User)
                .Where(x => x.User.Email == User.FindFirstValue(ClaimTypes.Email))
                .Where(expense => expense.Date > queryParams.FromDate && expense.Date < queryParams.ToDate)
                .ProjectTo<GetExpenseDto>(_mapper.ConfigurationProvider);

            if (!string.IsNullOrEmpty(queryParams.Category))
            {
                expensesQuery = expensesQuery
                    .Where(x => x.Category.Name == queryParams.Category);
            }


            return Ok(await expensesQuery.ToListAsync());
        }

        [HttpPost]
        public async Task<IActionResult> AddExpense(ExpenseDto addExpenseDto)
        {
            try
            {
                var categories = await _context.Categories.ToListAsync();
                var newExpense = await HandleAddExpenseDto(addExpenseDto,categories);
                var value = await _context.Expenses.AddAsync(newExpense);
                var expenseDto = _mapper.Map<GetExpenseDto>(value.Entity);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Ok(expenseDto);
                }
                return BadRequest("Fail to add new expense");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(Guid id, [FromBody] ExpenseDto updateExpenseDto)
        {
            var expense = await _context.Expenses
                .Include(x => x.Category)
                .Include(x => x.User)
                .Where(x => x.User.Email == User.FindFirstValue(ClaimTypes.Email))
                .FirstOrDefaultAsync(x => x.Id == id);

            if (expense == null) return BadRequest("Expense not found");

            if (!expense.Category.Name.Equals(updateExpenseDto.CategoryName))
            {
                var category = await _context.Categories.FirstOrDefaultAsync(x => x.Name == updateExpenseDto.CategoryName);
                if (category == null) return BadRequest("No such category");
                expense.Category = category;
            }

            expense.Amount = updateExpenseDto.Amount;
            expense.Date = updateExpenseDto.Date;
            expense.Name = updateExpenseDto.ExpenseName;

            var updatedExpense = _mapper.Map<GetExpenseDto>(expense);

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(updatedExpense);
            }

            return BadRequest("Error updating expense");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            var expense = await _context.Expenses
                .Include(x => x.User)
                .Where(x => x.User.Email == User.FindFirstValue(ClaimTypes.Email))
                .FirstOrDefaultAsync(x => x.Id == id);

            if (expense == null)
            {
                return BadRequest("Error deleting expense");
            }

            _context.Expenses.Remove(expense);

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok();
            }
            return BadRequest("Error deleting expense");
        }


        [HttpPost("list")]
        public async Task<IActionResult> AddExpenses(List<ExpenseDto> expenseDtos)
        {
            List<Expense> expenses = new List<Expense>();
            var categories = await _context.Categories.ToListAsync();
            expenseDtos.ForEach(async x =>
            {
                var expense = await HandleAddExpenseDto(x, categories);
                expenses.Add(expense);
            });

            await _context.Expenses.AddRangeAsync(expenses);
            await _context.SaveChangesAsync();
            return Ok(expenses);
        }

        [HttpDelete("list")]
        public async Task<IActionResult> DeleteAllExpenses()
        {
            int res = await _context.Database.ExecuteSqlRawAsync("TRUNCATE TABLE EXPENSES");
            if (res == 0)
            {
                return BadRequest("Not deleted");
            }
            return Ok();
        }

        private async Task<Expense> HandleAddExpenseDto(ExpenseDto expenseDto, List<Category> categories)
        {
            var category = categories.Find(x => x.Name.Equals(expenseDto.CategoryName));

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (category == null) throw new Exception("Provided category was not found");

            var newExpense = new Expense
            {
                Name = expenseDto.ExpenseName,
                Amount = expenseDto.Amount,
                Date = expenseDto.Date,
                User = user
            };
            newExpense.Category = category;
            return newExpense;
        }
    }
}
