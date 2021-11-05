using EVNTalent.Domain.Entities;
using EVNTalent.Services.Common.Infrastructure;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EVNTalent.Services.DepartmentCommands.Query.DepartmentList
{
    public class DepartmentListQuery : IRequest<DepartmentListQueryResult>
    {
    }
    public class DepartmentListQueryHandler : IRequestHandler<DepartmentListQuery, DepartmentListQueryResult>
    {
        private readonly ApplicationDbContext _dbContext;

        public DepartmentListQueryHandler(ApplicationDbContext dbContext) => _dbContext = dbContext;
        public async Task<DepartmentListQueryResult> Handle(DepartmentListQuery request, CancellationToken cancellationToken)
        {
            return new DepartmentListQueryResult()
            {
                DepartmentList = await _dbContext.Departments.ToListAsync()
            };
        }
    }
    public class DepartmentListQueryResult
    {
        public List<Department> DepartmentList { get; set; }
    }
}
