using backend.Entities;
using backend.Models;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserDto request)
        {
            var user = await authService.RegisterAsync(request);

            if (user == null)
            {
                return BadRequest("Korisnik s tim imenom već postoji.");
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(LoginUserDto request)
        {
            var result = await authService.LoginAsync(request.UsernameOrEmail, request.Password);

            if (result == null)
            {
                return BadRequest("Nevažeće korisničko ime ili lozinka.");
            }

            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
        {
            var result = await authService.RefreshTokensAsync(request);

            if (result is null || result.AccessToken is null || result.RefreshToken is null)
            {
                return BadRequest("Nevažeće korisničko ime ili lozinka.");
            }

            return Ok(result);
        }
    }
}