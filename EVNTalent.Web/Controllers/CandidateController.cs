namespace EVNTalent.Web.Controllers
{
    using EVNTalent.Services.CandidateCommands.Queriy.CandidateList;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;
    public class CandidateController : ApiController

    {
        public CandidateController(IMediator mediator) : base(mediator)
        {
        }
        [HttpGet]
        public async Task<IActionResult> GetListController()
        {
            var result = await _mediator.Send(new CandidateListQuery { });
            return Ok(result);
        }
      

    }
}
