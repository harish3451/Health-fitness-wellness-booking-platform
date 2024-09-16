using Authentication_Serivce.Helper;
using Authentication_Serivce.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authentication_Serivce.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthdbContext _context;
        
        public AuthController( AuthdbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            
            
            var users = _context.Users.ToList();
            foreach(var u in users)
            {
                 if(u.email == model.email)
                {
                    return BadRequest(new { Message = "Email already registered" });
                }
            }
            var user = new User { name = model.name, email = model.email, phoneNumber = model.phoneNumber,password = HashPassword.HashedPassword(model.password)};
            await _context.Users.AddAsync(user);
            _context.SaveChanges();
            return Ok("User registered");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var user = _context.Users.Where(u => u.email == model.Email).SingleOrDefault<User>();
            if(user != null && HashPassword.VerifyPassword(model.Password,user.password))
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub,user.email),
                    new Claim(JwtRegisteredClaimNames.Jti,Guid.NewGuid().ToString())
                 };

                var key = new SymmetricSecurityKey(Encoding.UTF32.GetBytes("This-is-a-secret-key"));
                var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                        issuer: "HealthHub",
                        audience: "HealthHub",
                        claims:claims,
                        expires: DateTime.Now.AddMonths(1),
                        signingCredentials:creds
                       );
                return Ok(new {Token = new JwtSecurityTokenHandler().WriteToken(token)});
            }
            return Unauthorized();
        }

        [Authorize]
        [HttpGet("profile")]
        public async Task<IActionResult> Profile()
        {
            

            var claims = User.Claims.Select(c=> new {c.Type,c.Value}).ToList();
            var email = claims[0].Value;
            var user =  _context.Users.Where(u=>u.email == email).Single<User>();
            return Ok(
                new
                {
                    Id = user.id,
                    Name = user.name,
                    Email = user.email,
                    PhoneNumber = user.phoneNumber,

                }
            );
        }
        [Authorize]
        [HttpPost("resetPassword/{id}")]
        public async Task<IActionResult> ResetPassword(int id, [FromBody] Reset pass)
        {
            var user = _context.Users.Find(id);
            if (HashPassword.VerifyPassword( pass.oldPassword, user.password))
            {
                user.password = HashPassword.HashedPassword( pass.newPassword);
                _context.Users.Update(user);
                _context.SaveChanges();
                return Ok("Password Updated");
            }
            return BadRequest("Wrong old password Entered");
        }

        [HttpGet]
        public ActionResult NumberOfUsers()
        {
            var count = _context.Users.Count();
            return Ok(count);
        }
    }
    
}
