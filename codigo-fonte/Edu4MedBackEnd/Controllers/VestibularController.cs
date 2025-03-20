using Microsoft.AspNetCore.Mvc;
using Edu4MedBackEnd.Models;
using Edu4MedBackEnd.Services;
using Microsoft.AspNetCore.Authorization;
namespace Edu4MedBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VestibularController : ControllerBase
    {
        private readonly IVestibularService _vestibularService;

        public VestibularController(IVestibularService vestibularService)
        {
            _vestibularService = vestibularService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vestibular>>> GetAll()
        {
            var vestibulares = await _vestibularService.GetAllAsync();
            return Ok(vestibulares);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vestibular>> GetById(int id)
        {
            var vestibular = await _vestibularService.GetByIdAsync(id);
            if (vestibular == null) return NotFound();
            return Ok(vestibular);
        }

        [Authorize(Roles = "admin")]
        [HttpPost]
        public async Task<ActionResult<Vestibular>> Create([FromBody] Vestibular vestibular)
        {
            var novoVestibular = await _vestibularService.CreateAsync(vestibular);
            return CreatedAtAction(nameof(GetById), new { id = novoVestibular.Id }, novoVestibular);
        }
        [Authorize(Roles = "admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Vestibular vestibular)
        {
            var atualizado = await _vestibularService.UpdateAsync(id, vestibular);
            if (!atualizado) return NotFound();
            return NoContent();
        }
        [Authorize(Roles = "admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletado = await _vestibularService.DeleteAsync(id);
            if (!deletado) return NotFound();
            return NoContent();
        }
    }

}
