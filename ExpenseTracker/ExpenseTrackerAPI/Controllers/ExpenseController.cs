using ExpenseTrackerAPI.Core;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;
using ExpenseTrackerAPI.Models.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ILogger<ExpenseController> _logger;

        public ExpenseController(DataContext context, ILogger<ExpenseController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        public async Task<IActionResult> ExpenseList([FromQuery]QueryParams queryParams)
        {
            var expensesQuery = _context.Expenses
                .Include(x => x.Category)
                .Where(expense => expense.Date > queryParams.FromDate && expense.Date < queryParams.ToDate);

            if (queryParams.WholeTime)
            {

            } else if (queryParams.WholeYear)
            {
                expensesQuery = expensesQuery
                    .Where(expense => expense.Date.Year == queryParams.Year);
            }
            else
            {
                expensesQuery = expensesQuery
                    .Where(x => x.Date >= DateTime.Now.AddMonths(-queryParams.LastMonth));
            }
            //year
            
            expensesQuery = expensesQuery
                    .Where(expense => expense.Date.Year == queryParams.Year);

            //month number
            if (queryParams.Month >= 1 && queryParams.Month <= 12)
            {
                expensesQuery = expensesQuery
                    .Where(expense => expense.Date.Month == queryParams.Month);
            }

            if (queryParams.Category != null)
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
                var newExpense = HandleAddExpenseDto(addExpenseDto,categories);
                var value = await _context.Expenses.AddAsync(newExpense);
                var result = await _context.SaveChangesAsync() > 0;
                if (result)
                {
                    return Ok(value.Entity);
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

            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return Ok(expense);
            }

            return BadRequest("Error updating expense");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            var expense = await _context.Expenses.FindAsync(id);

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
            expenseDtos.ForEach(x =>
            {
                var expense = HandleAddExpenseDto(x, categories);
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

        private Expense HandleAddExpenseDto(ExpenseDto expenseDto, List<Category> categories)
        {
            var category = categories.Find(x => x.Name.Equals(expenseDto.CategoryName));

            if (category == null) throw new Exception("Provided category was not found");

            var newExpense = new Expense
            {
                Name = expenseDto.ExpenseName,
                Amount = expenseDto.Amount,
                Date = expenseDto.Date,
            };
            newExpense.Category = category;
            return newExpense;
        }
    }
}
