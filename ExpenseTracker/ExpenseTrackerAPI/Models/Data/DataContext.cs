using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Models.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Expense> Expenses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Category>()
                .HasData(
                    new Category { Id=Guid.NewGuid(), Name = "Food", Description = "Groceries/Baby Needs/Cosmetics/Personal Care", },
                    new Category {Id=Guid.NewGuid(),  Name = "Personal Care", Description = "Cosmetics/Personal Care", },
                    new Category {Id=Guid.NewGuid(),  Name = "Clothing", Description = "Clothes" },
                    new Category {Id=Guid.NewGuid(),  Name = "Transportation", Description = "Bus/Taxi/Fuel/Insurance/Maintenance/Parking" },
                    new Category {Id=Guid.NewGuid(),  Name = "Housing", Description = "Mortgage/Taxes/Rent/Insurance" },
                    new Category {Id=Guid.NewGuid(),  Name = "Utilities", Description = "Phone/Cell phone/Gas/Cable/Internet/Hydro" },
                    new Category {Id=Guid.NewGuid(),  Name = "Medical", Description = "Health care premiums/Specialists/Over-the-counter" },
                    new Category {Id=Guid.NewGuid(),  Name = "Education", Description = "School/Courses/Training/College/University" },
                    new Category {Id=Guid.NewGuid(),  Name = "Entertainment", Description = "Gaming/Cinema/Attractions/Museums/Restaurants/Cafe" },
                    new Category {Id=Guid.NewGuid(),  Name = "Subscriptions", Description = "Netflix/Disney Plus/Amazon Prime/Youtube Premium/Gaming Subscriptions/etc" },
                    new Category {Id = Guid.NewGuid(), Name = "Other", Description = "Uncategorized" }
                ) ;
        }
    }
}
