using Edu4MedBackEnd.Models;
using Edu4MedBackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace Edu4MedBackEnd.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly IUsuarioService _usuarioService;

        public AuthController(ITokenService tokenService, IUsuarioService usuarioService)
        {
            _tokenService = tokenService;
            _usuarioService = usuarioService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateAsync([FromBody] Usuario usuario)
        {
            var user = await _usuarioService.GetByEmailAsync(usuario.Email);

            if (user == null || user.Password != usuario.Password)
                return Unauthorized(new { message = "Credenciais inválidas." });

            var token = await _tokenService.GenerateToken(user); // Usa o usuário com roles

            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    email = user.Email,
                    roles = user.Role // Já pega direto do objeto user
                }
            });
        }
    }
}
