﻿namespace ExpenseTrackerAPI.Core
{
    public class QueryParams
    {
        public DateTime FromDate { get; set; } = DateTime.MinValue;
        public DateTime ToDate { get; set; } = DateTime.MaxValue;
        public string Category { get; set; } = null;
    }
}
