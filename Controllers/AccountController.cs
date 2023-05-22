using Library.DTO;
using Library.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;

        public AccountController(UserManager<ApplicationUser> _userManager, IConfiguration _configuration)
        {
            this.userManager = _userManager;
            this.configuration = _configuration;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Registration(RegisterUserDto userDto)
        {
            if (ModelState.IsValid)
            {
                ApplicationUser user = new ApplicationUser();
                user.UserName = userDto.UserName;
                user.Email = userDto.Email;
                user.PhoneNumber = userDto.Phone;
                user.Gender = userDto.Gender;
                user.Age = userDto.Age;
                user.ImgUrl= userDto.ImgUrl;
                IdentityResult result = await userManager.CreateAsync(user, userDto.Password);
                if (result.Succeeded)
                {
                    return Ok("account created");
                }
                return BadRequest(result.Errors.FirstOrDefault());
            }
            return BadRequest(ModelState);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginUserDto userDto)
        {
            if (ModelState.IsValid)
            {
                //check - create token
                ApplicationUser user = await userManager.FindByNameAsync(userDto.UserName);
                if (user != null)
                {
                    bool found = await userManager.CheckPasswordAsync(user, userDto.Password);
                    if (found)
                    {
                        //claims token
                        var claims = new List<Claim>();
                        claims.Add(new Claim(ClaimTypes.Name, user.UserName));
                        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
                        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

                        //get roles
                        var roles = await userManager.GetRolesAsync(user);
                        foreach (var role in roles)
                        {
                            claims.Add(new Claim(ClaimTypes.Role, role));
                        }
                        SecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));
                        SigningCredentials signingCred = new SigningCredentials(securityKey, algorithm: SecurityAlgorithms.HmacSha256);
                        //create token
                        JwtSecurityToken mytoken = new JwtSecurityToken(
                            issuer: configuration["JWT:ValidIssuer"],// url web api 
                            audience: configuration["JWT:ValidAudiance"],//url consumer angular
                            claims: claims,
                            expires: DateTime.UtcNow.AddHours(1),
                            signingCredentials: signingCred

                            );
                        return Ok(new
                        {
                            token = new JwtSecurityTokenHandler().WriteToken(mytoken),
                            expiration = mytoken.ValidTo,
                        });

                    }
                    else
                    {
                        return Unauthorized();
                    }

                }
                else
                {
                    return Unauthorized();
                }

            }
            else { return Unauthorized(); }

        }
    }
}
