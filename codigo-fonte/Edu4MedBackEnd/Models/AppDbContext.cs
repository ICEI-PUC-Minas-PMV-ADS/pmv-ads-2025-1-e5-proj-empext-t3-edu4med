using Edu4MedBackEnd.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Edital> Editais { get; set; }
    public DbSet<Vestibular> Vestibulares { get; set; }

    public DbSet<UsuarioVestibular> UsuariosVestibulares {  get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UsuarioVestibular>()
            .HasKey(uv => new { uv.usuarioId, uv.vestibularId }); // Chave composta

        modelBuilder.Entity<UsuarioVestibular>()
            .HasOne(uv => uv.Usuario)
            .WithMany(u => u.UsuariosVestibulares)
            .HasForeignKey(uv => uv.usuarioId);

        modelBuilder.Entity<UsuarioVestibular>()
            .HasOne(uv => uv.Vestibular)
            .WithMany(v => v.UsuariosVestibulares)
            .HasForeignKey(uv => uv.vestibularId);
    }


}
