namespace EVNTalent.Web.Controllers
{
    using EVNTalent.Services.CandidateCommands.Command;
    using EVNTalent.Services.CandidateCommands.Queriy.CandidateList;
    using EVNTalent.Services.CandidateCommands.Queriy.CanidateBy;
    using EVNTalent.Services.Common.ValidationHandler;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System.Threading.Tasks;

    [Route("api/candidate")]
    public class CandidateController : ApiController
    {

        private readonly ValidationCandidateCreate _validationRules;
        public CandidateController(IMediator mediator, ValidationCandidateCreate validationRules) : base(mediator)
        {
            _validationRules = validationRules;
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

        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> DetauilsById([FromRoute] string id)
        {
            if (id == null)
            {
                return BadRequest(new { Errors = "Candidate gone" });
            }
            var result = await _mediator.Send(new CandidateByIdQuery {Id=id });
            return Ok(result);
        }
    }
}
