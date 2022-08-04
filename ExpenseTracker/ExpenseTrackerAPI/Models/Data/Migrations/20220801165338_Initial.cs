using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExpenseTrackerAPI.Models.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Expenses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Expenses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Expenses_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "Id");
                });

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Description", "Name" },
                values: new object[,]
                {
                    { new Guid("084dbf00-3182-4e68-b312-a0769fbb9f9e"), "Gaming/Cinema/Attractions/Museums/Restaurants/Cafe", "Entertainment" },
                    { new Guid("167497b4-d6dc-41ab-9a37-f9c1f21fd765"), "School/Courses/Training/College/University", "Education" },
                    { new Guid("17f974db-50fd-43cb-888e-365d399ebf44"), "Uncategorized", "Other" },
                    { new Guid("4e0db0f7-d7e6-45e6-b969-a27fbef0fbbc"), "Groceries/Baby Needs/Cosmetics/Personal Care", "Food" },
                    { new Guid("7bb67c1e-49a5-4593-82bf-f39f40289190"), "Phone/Cell phone/Gas/Cable/Internet/Hydro", "Utilities" },
                    { new Guid("9a311b0d-e44b-48c8-9d24-d208fd49247f"), "Netflix/Disney Plus/Amazon Prime/Youtube Premium/Gaming Subscriptions/etc", "Subscriptions" },
                    { new Guid("a8e65a6d-8dba-4b09-8795-fa0f8fb89d0e"), "Clothes", "Clothing" },
                    { new Guid("c11e8c27-d856-4230-beb5-6b7623e297f8"), "Cosmetics/Personal Care", "Personal Care" },
                    { new Guid("d31a464e-3e0f-407e-8414-260c22a9a316"), "Mortgage/Taxes/Rent/Insurance", "Housing" },
                    { new Guid("d6c9d38c-c139-425b-b17f-fe4ba3e0507f"), "Health care premiums/Specialists/Over-the-counter", "Medical" },
                    { new Guid("eef9e797-6ee6-440f-8e18-7cac0d8e6bbf"), "Bus/Taxi/Fuel/Insurance/Maintenance/Parking", "Transportation" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Expenses");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
