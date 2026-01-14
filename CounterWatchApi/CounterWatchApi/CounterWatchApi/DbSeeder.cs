using AutoMapper;
using BLL.Constants;
using DAL;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace CounterWatchApi;

public static class DbSeeder
{
    public static async Task SeedData(this WebApplication webApplication)
    {
        using var scope = webApplication.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<RoleEntity>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<UserEntity>>();
        var mapper = scope.ServiceProvider.GetRequiredService<IMapper>();

        context.Database.Migrate();

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
