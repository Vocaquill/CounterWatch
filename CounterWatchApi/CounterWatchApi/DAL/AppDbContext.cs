using DAL.Entities.Common;
using DAL.Entities.Genre;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
    {
    }

    public DbSet<GenreEntity> Genres { get; set; }
}
