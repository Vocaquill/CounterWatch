using BLL.Interfaces;

namespace BLL.Services;

public class DbSeeder(IGenresService genresService) : IDbSeeder
{
    public async Task SeedData()
    {
        await genresService.SeedGenresAsync(Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Genres.json"));
    }
}
