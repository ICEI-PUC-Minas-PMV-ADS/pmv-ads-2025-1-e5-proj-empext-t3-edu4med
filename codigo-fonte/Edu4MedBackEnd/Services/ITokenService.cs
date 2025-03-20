using Edu4MedBackEnd.Models;

namespace Edu4MedBackEnd.Services

{
    public interface ITokenService
    {
        Task <string>GenerateToken(Usuario usuario);
    }
}
