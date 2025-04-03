namespace Edu4MedBackEnd.Models
{
    public class UsuarioVestibular
    {
        public int usuarioId;
        public Usuario Usuario { get; set; }
       
        public int vestibularId;
        public Vestibular Vestibular { get; set; }

        public List<UsuarioVestibular> UsuariosVestibulares { get; set; } 
    }
}
