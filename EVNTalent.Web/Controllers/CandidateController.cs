namespace EVNTalent.Web.Controllers
{
    using EVNTalent.Services.CandidateCommands.Command;
    using EVNTalent.Services.CandidateCommands.Queriy.CandidateList;
    using EVNTalent.Services.CandidateCommands.Queriy.CanidateBy;
    using EVNTalent.Services.CandidateCommands.Queriy.FilterCandidate;
    using EVNTalent.Services.Common.ValidationHandler;
    using MediatR;
    using Microsoft.AspNetCore.Mvc;
    using System;
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
            string id = await _mediator.Send(model);
            return Ok(new { Id=id});
        }

        [HttpGet]
        [Route("details/{id}")]
        public async Task<IActionResult> DetailsById([FromRoute] string id)
        {
            if (id == null)
            {
                return BadRequest(new { Errors = "Candidate gone" });
            }
            var result = await _mediator.Send(new CandidateByIdQuery {Id=id });
            return Ok(result);
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            if (id == null)
            {
                return BadRequest(new { Errors = "Candidate gone" });
            }
            int result = await _mediator.Send(new DeleteCandidateCommand { Id = id});
            return Ok(result);
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update([FromRoute] string id, EditCandidateCommand candidateDto)
        {
            if (id == null)
            {
                return BadRequest(new { Errors = "Id gone" });
            }
            var validationResult = _validationRules.Validate(candidateDto);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }
            try
            {
                candidateDto.Id = id;
                string resultId = await _mediator.Send(candidateDto);
                return Ok(new { Id=resultId});
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("filter")]
        public async Task<IActionResult> Filter(FilterCandidateQeury filter)
        {
            var result = await _mediator.Send(filter);
            return Ok(result);
        }
        [HttpGet]
        [Route("sort")]
        public async Task<IActionResult> Sort([FromQuery] string query)
        {
            var result = await _mediator.Send(new SortByCandidateQuery { Query = query });
            return Ok(result);
        }
    }
}
