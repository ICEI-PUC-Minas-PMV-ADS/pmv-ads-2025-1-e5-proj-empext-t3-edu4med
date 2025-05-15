using System.ComponentModel.DataAnnotations;

namespace Edu4MedBackEnd.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O nome completo é obrigatório.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O Email é obrigatório.")]
        [StringLength(100, MinimumLength = 5, ErrorMessage =
        "O Email deve ter no mínimo 5 e no máximo 100 caracteres.")]
        [EmailAddress(ErrorMessage = "O email não está em um formato válido.")]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password {  get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;

    }
}
