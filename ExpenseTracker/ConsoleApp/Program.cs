// See https://aka.ms/new-console-template for more information
using System.Text.Json;


var categories = new[]
{
    new {Name="Food", Description="Groceries/Baby Needs/Cosmetics/Personal Care", },
    new {Name="Personal Care", Description="Cosmetics/Personal Care", },
    new {Name="Clothing", Description="Clothes"},
    new {Name="Transportation", Description="Bus/Taxi/Fuel/Insurance/Maintenance/Parking" },
    new {Name="Housing", Description="Mortgage/Taxes/Rent/Insurance" },
    new {Name="Utilities", Description="Phone/Cell phone/Gas/Cable/Internet/Hydro" },
    new {Name="Medical", Description="Health care premiums/Specialists/Over-the-counter" },
    new {Name="Education", Description="School/Courses/Training/College/University" },
    new {Name="Entertainment", Description="Gaming/Cinema/Attractions/Museums/Restaurants/Cafe" },
    new {Name="Subscriptions", Description="Netflix/Disney Plus/Amazon Prime/Youtube Premium/Gaming Subscriptions/etc" },
    new {Name="Other", Description="Uncategorized" }
};

foreach(var category in categories)
{
    Console.WriteLine(string.Join(", ",category.Description.Split('/')));
}

string json = JsonSerializer.Serialize(categories);

File.WriteAllText("categories.json", json);