﻿namespace EVNTalent.Web.Controllers
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
        public async Task<ActionResult> Update([FromRoute] string id, EditCandidateCommand candidateDto)
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
                var result = await _mediator.Send(candidateDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }

        [HttpPost]
        [Route("filter")]
        public async Task<ActionResult> filter(FilterCandidateQeury filter)
        {
            var result = await _mediator.Send(filter);
            return Ok(result);
        }
        [HttpGet]
        [Route("sort")]
        public async Task<ActionResult> Sort([FromQuery] String query)
        {
           
            SortByCandidateQuery _sort = new SortByCandidateQuery {   Query=query };
            var result = await _mediator.Send(_sort);
            return Ok(result);
        }
    }
}
