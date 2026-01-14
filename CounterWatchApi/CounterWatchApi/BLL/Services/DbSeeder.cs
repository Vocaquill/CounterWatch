using AutoMapper;
using BLL.Constants;
using BLL.Interfaces;
using DAL;
using DAL.Entities.Genre;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
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

        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
        var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();

        context.Database.Migrate();

        await genresService.SeedGenresAsync(
            Path.Combine(Directory.GetCurrentDirectory(), "Helpers", "JsonData", "Genres.json")
        );

        if (!context.Roles.Any())
        {
            foreach (var roleName in Roles.AllRoles)
            {
                var result = await roleManager.CreateAsync(new(roleName));
                if (!result.Succeeded)
                {
                    Console.WriteLine("Error Create Role {0}", roleName);
                }
            }
        }
    }
}
