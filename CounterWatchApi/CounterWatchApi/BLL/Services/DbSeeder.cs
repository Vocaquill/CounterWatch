using BLL.Interfaces;
using DAL;
using DAL.Entities.Genre;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace BLL.Services;

public class DbSeeder(IServiceProvider serviceProvider) : IDbSeeder
{
    public async Task SeedData()
    {
        using var scope = serviceProvider.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var genresService = scope.ServiceProvider.GetRequiredService<IGenresService>();

        context.Database.Migrate();

        await genresService.SeedGenresAsync(
            Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Genres.json")
        );
    }
}
