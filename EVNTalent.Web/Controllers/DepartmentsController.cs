using EVNTalent.Services.DepartmentCommands.Commands;
using EVNTalent.Services.DepartmentCommands.Query.DepartmentList;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EVNTalent.Web.Controllers
{
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public DepartmentsController(IMediator mediator) => _mediator = mediator;
        [HttpGet]
        public async Task<IActionResult> GetListController()
        {
            var result = await _mediator.Send(new DepartmentListQuery { }); 
            return Ok(result);
        }
        [HttpPost]
        public async Task<IActionResult> AddDepartment(AddDepartmentsCommand addDepartment)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest();
            }
            var result = await _mediator.Send(addDepartment);
            return Ok(result);
        }
    }
}
