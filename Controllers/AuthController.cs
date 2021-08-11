using AMP.Data;
using AMP.Dtos;
using AMP.Helpers;
using Microsoft.AspNetCore.Http;
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
        private readonly JwtService _jwtService;

        //Constructor
        public AuthController(IUserRepository repo, JwtService jwtService)
        {
            _repository = repo;
            _jwtService = jwtService;
        }

        //POST api/auth/login
        [HttpPost("login")]
        public IActionResult Login (LoginDto dto)
        {
            var user = _repository.GetUserByEmail(dto.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Invalid Credentials"});
            }
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                //For security, we don't want to know which is incorrect the email or password.
                return BadRequest(new { message = "Invalid Credentials" });
            }

            //Generate a token
            var jwt = _jwtService.Generate(user.Id);

            //Adding Token to cookies
            Response.Cookies.Append("jwt", jwt, new CookieOptions {
                HttpOnly = true //frontend cannot access jwt
            });

            return Ok(new {
                message = "User is now logged in"
            });
        }

        //GET api/auth/user
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            //Handling Exception for token problemes
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Verify(jwt);

                //Getting User ID from token
                Guid userId = Guid.Parse(token.Issuer);

                //Getting User from User ID
                var user = _repository.GetUserById(userId);

                //return user
                return Ok(user);
            }
            catch (Exception e)
            {

                return Unauthorized(); //No Connexion
            }
        }

        //POST api/auth/logout
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            //We will remove the cookie that we set
            Response.Cookies.Delete("jwt");
            return Ok(new
            {
                message = "User is now logged out"
            });
        }
    }
}
