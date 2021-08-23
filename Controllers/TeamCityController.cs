using AMP.Data;
using AMP.Helpers;
using AMP.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamCityController : ControllerBase
    {
        //Injection de dépandances
        private readonly ITeamCityRepository _repository;
        private readonly JwtService _jwtService;

        //Constructor
        public TeamCityController(ITeamCityRepository repository, JwtService jwtService)
        {
            _repository = repository;
            _jwtService = jwtService;
        }

        //GET api/teamcity/build/{id}
        [HttpGet("build/{id}")]
        public ActionResult<Build> GetBuildById(int id)
        {
            var jwt = Request.Cookies["jwt"];
            var token = _jwtService.Verify(jwt);
            if (token == null)
            {
                return Unauthorized();
            }
            var build = _repository.GetBuildById(id);
            build.BuildStage = _repository.GetBuildDuration(id);
            build.CodeCoverage = _repository.GetCodeCoverage(id);
            build.CodeInspections = _repository.GetCodeInspections(id);
            build.Changes = _repository.GetBuildChanges(id);
            return Ok(build);
        }
    }
}
