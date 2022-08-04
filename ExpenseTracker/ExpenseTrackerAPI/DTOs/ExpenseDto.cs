namespace ExpenseTrackerAPI.DTOs
{
    public class ExpenseDto
    {
        public string ExpenseName { get; set; } = "";
        public double Amount { get; set; }
        public DateTime Date { get; set; } = DateTime.UtcNow;
        public string CategoryName { get; set; }
    }
}
