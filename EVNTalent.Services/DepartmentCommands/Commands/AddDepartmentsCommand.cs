namespace EVNTalent.Services.DepartmentCommands.Commands
{
    using System.Threading;
    using System.Threading.Tasks;
    using MediatR;
    using Services.Common.Infrastructure;
    using Domain.Entities;
    using EVNTalent.Services.Common.Interfaces;
    using AutoMapper;

    public class AddDepartmentsCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class AddDepartmentsCommandHandler : AppIRequestHandler<AddDepartmentsCommand, int>
    {
        public AddDepartmentsCommandHandler(IApplicaitonDbContext data, IMapper mapper) : base(data, mapper)
        {
        }

        public override async Task<int> Handle(AddDepartmentsCommand request, CancellationToken cancellationToken)
        {
            await _data.Departments.AddAsync(_mapper.CreateMapper().Map<Department>(request));
            int value = await _data.SaveChangesAsync(); 
            return (value);
        }
    }
}
