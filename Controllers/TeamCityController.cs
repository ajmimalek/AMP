using AMP.Data;
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

        //Constructor
        public TeamCityController(ITeamCityRepository repository)
        {
            _repository = repository;
        }

        //GET api/teamcity/build/{id}
        [HttpGet("build/{id}")]
        public ActionResult<Build> GetBuildById(int id)
        {
            var build = _repository.GetBuildById(id);
            build.BuildStage = _repository.GetBuildDuration(id);
            build.CodeCoverage = _repository.GetCodeCoverage(id);
            build.CodeInspections = _repository.GetCodeInspections(id);
            return Ok(build);
        }
    }
}
