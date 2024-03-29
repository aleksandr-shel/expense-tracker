﻿using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.DTOs
{
    public class GetExpenseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Category Category { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }
    }
}
