namespace Edu4MedBackEnd.Models

{
    using System.ComponentModel.DataAnnotations;
    public class Edital
    {
        [Key]
        public int Id { get; set; }
        public string Estado { get; set; } = string.Empty;
        public DateTime DataInicial { get; set; }
        public DateTime DataFinal { get; set; }
        public string Url { get; set; } = string.Empty;
        public Boolean Ativo { get; set; } = false;

    }
}
