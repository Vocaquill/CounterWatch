using DAL.Entities.Common;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
       : base(options)
    {
    }

    public DbSet<TestTableEntity> TestTableEntities { get; set; }
}
