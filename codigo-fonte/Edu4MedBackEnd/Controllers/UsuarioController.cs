using Edu4MedBackEnd.Models;
using Edu4MedBackEnd.Services;
using Microsoft.AspNetCore.Mvc;

namespace Edu4MedBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        public readonly IUsuarioService _usuarioService;

        public UsuarioController (IUsuarioService usuarioService)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task <ActionResult<List<Usuario>>> GetAll()
        {
            var usuarios = await _usuarioService.GetAllAsync();
            return Ok(usuarios);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vestibular>> GetById(int id)
        {
            var usuario = await _usuarioService.GetByIdAsync(id);
            if (usuario == null) return NotFound();
            return Ok(usuario);
        }
        
        [HttpPost]
        public async Task<ActionResult<Usuario>> Create([FromBody] Usuario usuario)
        {
            var novoUsuario = await _usuarioService.CreateAsync(usuario);
            return CreatedAtAction(nameof(GetById), new { id = novoUsuario.Id }, novoUsuario);
        }
        
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Usuario usuario)
        {
            var atualizado = await _usuarioService.UpdateAsync(id, usuario);
            if (!atualizado) return NotFound(); 
            return NoContent();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete (int id)
        {
            var deletado = await _usuarioService.DeleteAsync(id);
            if (!deletado) return NotFound();
            return NoContent();
        }
        


    }


}
