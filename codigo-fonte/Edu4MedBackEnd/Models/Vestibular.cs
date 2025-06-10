using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Edu4MedBackEnd.Models
{
    [Table("Vestibulares")]
    public class Vestibular
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Universidade { get; set; } = string.Empty;
        public string Link { get; set; }
        public string Regiao  { get; set; }
        public string Instituicao { get; set; } = string.Empty;
        public string Vagas { get; set; } = string.Empty;
        public DateTime Fim_cadastro { get; set; }
        public string Link_inscricoes { get; set; } = string.Empty ;
        public bool? Ativo { get; set; } 
        public List<UsuarioVestibular> UsuariosVestibulares { get; set; }
    }
}
