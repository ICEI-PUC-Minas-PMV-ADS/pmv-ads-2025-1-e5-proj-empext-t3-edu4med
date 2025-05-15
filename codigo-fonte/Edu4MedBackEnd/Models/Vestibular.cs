using System.ComponentModel.DataAnnotations;

namespace Edu4MedBackEnd.Models
{
    public class Vestibular
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Universidade { get; set; } = string.Empty;
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
        public string Observacoes { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public Boolean Ativo { get; set; } = false;
    }
}
