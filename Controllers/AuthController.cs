using AMP.Data;
using AMP.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AMP.Controllers
{
    //Controller Level Route
    //[controller] : get the name of the class without Controller (users)
    [Route("api/[controller]")]
    [ApiController]
    //ControllerBase : Controller without Views.
    public class AuthController : ControllerBase
    {
        //Injection de dépandances
        private readonly IUserRepository _repository;

        //Constructor
        public AuthController(IUserRepository repo) => _repository = repo;

        //POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login (LoginDto dto)
        {
            var user = _repository.GetUserByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials"});
            }
            if (true)
            {

            }
            return Ok(user);
        }
    }
}
