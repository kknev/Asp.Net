using EVNTalent.Services.Common.Infrastructure;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EVNTalent.Services.DepartmentCommands.Commands
{
    public class AddDepartmentsCommand : IRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
    }
    public class AddDepartmentsCommandHandler : IRequestHandler<AddDepartmentsCommand>
    {
        public readonly ApplicationDbContext _dbContext;
        public AddDepartmentsCommandHandler(ApplicationDbContext dbContext) => _dbContext = dbContext;
        public async Task<Unit> Handle(AddDepartmentsCommand request, CancellationToken cancellationToken)
        {
            await _dbContext.Departments.AddAsync(new Domain.Entities.Department()
            {
                Name = request.Name,
                Description = request.Description
            });
            await _dbContext.SaveChangesAsync(); 
            return Unit.Value;
        }
    }
}
