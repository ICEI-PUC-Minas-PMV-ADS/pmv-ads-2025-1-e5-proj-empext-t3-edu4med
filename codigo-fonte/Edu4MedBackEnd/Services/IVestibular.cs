using Edu4MedBackEnd.Models;

namespace Edu4MedBackEnd.Services
{
    public interface IVestibularService
    {
        Task<List<Vestibular>> GetAllAsync();
        Task<Vestibular> GetByIdAsync(int id);
        Task<Vestibular> CreateAsync(Vestibular vestibular);
        Task<bool> UpdateAsync(int id, Vestibular vestibular);
        Task<bool> DeleteAsync(int id);
    }
}

