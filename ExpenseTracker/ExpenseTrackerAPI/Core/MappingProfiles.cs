using AutoMapper;
using ExpenseTrackerAPI.DTOs;
using ExpenseTrackerAPI.Models;

namespace ExpenseTrackerAPI.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            //not in use right now
            CreateMap<ExpenseDto, Expense>()
                .ForMember(x => x.Name, d => d.MapFrom(s => s.ExpenseName));


        }
    }
}
