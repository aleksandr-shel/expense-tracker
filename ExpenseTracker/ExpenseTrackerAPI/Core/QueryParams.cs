namespace ExpenseTrackerAPI.Core
{
    public class QueryParams
    {
        public DateTime FromDate { get; set; } = DateTime.MinValue;
        public DateTime ToDate { get; set; } = DateTime.Now;
        public string Category { get; set; } = null;
    }
}
