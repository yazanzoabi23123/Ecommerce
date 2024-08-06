using E_commerce.Auth;
using E_commerce.Exceptions;
using E_commerce.InterFaces;
using E_commerce.Models;
using E_commerce.Models.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace E_commerce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private IUserService _usersService;

        public UsersController(IUserService usersService)
        {
            _usersService = usersService;
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<User> users = await _usersService.GetUsersAsync();
            return Ok(users);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(string id)
        {

            bool.TryParse(HttpContext.User.FindFirstValue("isAdmin"), out bool isAdmin);
            bool isMyId = HttpContext.User.FindFirstValue("id") == id;
            if (!isAdmin && !isMyId)
            {
                return Unauthorized("You can watch only your own profile");
            }

            try
            {
                User? u = await _usersService.GetOneUserAsync(id);
                return Ok(u);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }

        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User newUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("validation");
            }

            try
            {
                object DTOuser = await _usersService.CreateUserAsync(newUser);
                return CreatedAtAction(nameof(Get), new { Id = newUser.Id }, DTOuser);

            }
            catch (UserAlreadyExistsException ex)
            {
                return Conflict(ex.Message);
            }


        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody] User updatedUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("validation");
            }
            try
            {
                User newUser = await _usersService.EditUserAsync(id, updatedUser);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(string id)
        {

            try
            {
                await _usersService.DeleteUserAsync(id);
            }
            catch (UserNotFoundException e)
            {
                return NotFound(e.Message);
            }

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);

            }
            try
            {
                User? u = await _usersService.LoginAsync(loginModel);
                string token = JwtHelper.GenerateAuthToken(u);
                return Ok(token);
            }
            catch (Exceptions.AuthenticationException ex)
            {
                
                return Unauthorized(ex.Message);

            }

            
        }
    }
}
