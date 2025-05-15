using Edu4MedBackEnd.Models;
using Microsoft.EntityFrameworkCore;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Edital> Editais { get; set; }
    public DbSet<Vestibular> Vestibulares { get; set; }
}
