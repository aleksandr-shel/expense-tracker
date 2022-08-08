using AutoMapper;
using ExpenseTrackerAPI.Core;
using ExpenseTrackerAPI.Models.Data;
using ExpenseTrackerAPI.Services;
using Microsoft.EntityFrameworkCore;

namespace ExpenseTrackerAPI.Extensions
{
    public static class ApplicationServicesExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            //add cors policy
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");

                });
            });

            //add automapper
            var mapper = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfiles());
            }).CreateMapper();

            services.AddSingleton(mapper);

            return services;
        }
    }
}
