namespace EVNTalent.Web.Controllers
{
    using EVNTalent.Services.CandidateCommands.Command;
    using EVNTalent.Services.CandidateCommands.Queriy.CandidateList;
    using EVNTalent.Services.Common.ValidationHandler;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    [Route("api/candidate")]
    public class CandidateController : ApiController
    {

        private readonly ValidationCandidateCreate _validationRules;
        public CandidateController(IMediator mediator) : base(mediator)
        {
        }
        [HttpGet]
        [Route("all")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _mediator.Send(new CandidateListQuery { });
            return Ok(result);
        }
        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> Create(AddCandidateCommand model)
        {
            var validationResult = _validationRules.Validate(model);


            if (!validationResult.IsValid)
            {

                return BadRequest(validationResult.Errors);
            }

            var result = await _mediator.Send(model);
            return Ok(result);
        }
    }
}
