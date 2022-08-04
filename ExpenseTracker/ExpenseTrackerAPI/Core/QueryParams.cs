namespace ExpenseTrackerAPI.Core
{
    public class QueryParams
    {
        public DateTime FromDate { get; set; } = DateTime.MinValue;
        public DateTime ToDate { get; set; } = DateTime.Now;
        public string Category { get; set; } = null;
        public int LastMonth { get; set; } = 1;
        public int Month { get; set; } = 0;
        public int Year { get; set; } = DateTime.Now.Year;
        public bool WholeYear { get; set; } = false;
        public bool WholeTime { get; set; } = false;
    }
}
