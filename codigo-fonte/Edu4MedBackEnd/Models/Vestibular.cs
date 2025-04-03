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
        public string Fim_cadastro {  get; set; }= string.Empty;
        public DateTime Link_inscricoes { get; set; }
        public DateTime Data_prova {  get; set; }
        public Boolean Ativo { get; set; } = false;
        public List<UsuarioVestibular> UsuariosVestibulares { get; set; }
    }
}
