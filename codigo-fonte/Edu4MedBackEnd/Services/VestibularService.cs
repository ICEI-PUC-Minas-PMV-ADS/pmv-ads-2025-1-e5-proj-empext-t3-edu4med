
using Edu4MedBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace Edu4MedBackEnd.Services
{
    public class VestibularService : IVestibularService
    {
        private readonly AppDbContext _context;

        public VestibularService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Vestibular>> GetAllAsync()
        {
            return await _context.Vestibulares.ToListAsync();
        }

        public async Task<Vestibular> GetByIdAsync(int id)
        {
            return await _context.Vestibulares.FindAsync(id);
        }

        public async Task<Vestibular> CreateAsync(Vestibular vestibular)
        {
            _context.Vestibulares.Add(vestibular);
            await _context.SaveChangesAsync();
            return vestibular;
        }

        public async Task<bool> UpdateAsync(int id, Vestibular vestibular)
        {
            var vestibularExistente = await _context.Vestibulares.FindAsync(id);
            if (vestibularExistente == null) return false;

            vestibularExistente.Universidade = vestibular.Universidade;
            vestibularExistente.Link = vestibular.Link;
            vestibularExistente.Regiao = vestibular.Regiao;
            vestibularExistente.Instituicao = vestibular.Instituicao;
            vestibularExistente.Vagas = vestibular.Vagas;
            vestibularExistente.Ativo = vestibular.Ativo;
            vestibularExistente.Fim_cadastro = vestibular.Fim_cadastro;
            vestibularExistente.Link_inscricoes = vestibular.Link_inscricoes;
            vestibularExistente.Data_prova = vestibular.Data_prova;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var vestibular = await _context.Vestibulares.FindAsync(id);
            if (vestibular == null) return false;

            _context.Vestibulares.Remove(vestibular);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
