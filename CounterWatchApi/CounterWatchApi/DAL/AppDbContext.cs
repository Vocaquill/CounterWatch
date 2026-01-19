using DAL.Entities.Common;
using DAL.Entities.Genre;
using DAL.Entities.Identity;
using DAL.Entities.Movie;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DAL;

public class AppDbContext :
        IdentityDbContext<UserEntity, RoleEntity, long, IdentityUserClaim<long>, UserRoleEntity, UserLoginEntity,
        IdentityRoleClaim<long>, IdentityUserToken<long>>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<GenreEntity> Genres { get; set; }
    public DbSet<MovieEntity> Movies { get; set; }
    public DbSet<CommentEntity> Comments { get; set; }
    public DbSet<MovieReactionEntity> MovieReactions { get; set; }
    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<UserRoleEntity>(ur =>
        {
            ur.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(r => r.RoleId)
                .IsRequired();

            ur.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        });

        builder.Entity<MovieGenreEntity>(mg =>
        {
            mg.HasKey(x => new { x.MovieId, x.GenreId });

            mg.HasOne(x => x.Movie)
                .WithMany(m => m.MovieGenres)
                .HasForeignKey(x => x.MovieId)
                .IsRequired();

            mg.HasOne(x => x.Genre)
                .WithMany(g => g.MovieGenres)
                .HasForeignKey(x => x.GenreId)
                .IsRequired();
        });

        builder.Entity<UserLoginEntity>(b =>
        {
            b.HasOne(l => l.User)
                .WithMany(u => u.UserLogins)
                .HasForeignKey(l => l.UserId)
                .IsRequired();
        });
    }
}
