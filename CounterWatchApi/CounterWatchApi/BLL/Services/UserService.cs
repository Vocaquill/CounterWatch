using AutoMapper;
using AutoMapper.QueryableExtensions;
using BLL.Constants;
using BLL.Interfaces;
using BLL.Models.Account;
using BLL.Models.Search;
using BLL.Models.Seeder;
using BLL.Models.User;
using DAL;
using DAL.Entities.Genre;
using DAL.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Diagnostics;

namespace BLL.Services;

public class UserService(UserManager<UserEntity> userManager,
    IMapper mapper,
    IImageService imageService,
    RoleManager<RoleEntity> roleManager,
    AppDbContext context) : IUserService
{
    public async Task<List<UserItemModel>> GetAllUsersAsync()
    {
        var users = await userManager.Users
            .ProjectTo<UserItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        await LoadLoginsAndRolesAsync(users);

        return users;
    }

    public async Task<SearchResult<UserItemModel>> SearchUsersAsync(UserSearchModel model)
    {
        var query = userManager.Users.AsQueryable();

        if (!string.IsNullOrWhiteSpace(model.Name))
        {
            string nameFilter = model.Name.Trim().ToLower().Normalize();

            query = query.Where(u =>
                (u.FirstName + " " + u.LastName).ToLower().Contains(nameFilter) ||
                u.FirstName.ToLower().Contains(nameFilter) ||
                u.LastName.ToLower().Contains(nameFilter));
        }

        if (model?.StartDate != null)
        {
            query = query.Where(u => u.DateCreated >= model.StartDate);
        }

        if (model?.EndDate != null)
        {
            query = query.Where(u => u.DateCreated <= model.EndDate);
        }

        if (model?.Roles != null && model.Roles.Any())
        {
            query = query.Where(u => u.UserRoles.Any(ur => model.Roles.Contains(ur.Role.Name)));
        }

        var totalCount = await query.CountAsync();

        var safeItemsPerPage = model.ItemPerPage < 1 ? 10 : model.ItemPerPage;
        var totalPages = (int)Math.Ceiling(totalCount / (double)safeItemsPerPage);
        var safePage = Math.Min(Math.Max(1, model.Page), Math.Max(1, totalPages));

        var users = await query
            .OrderBy(u => u.Id)
            .Skip((safePage - 1) * safeItemsPerPage)
            .Take(safeItemsPerPage)
            .ProjectTo<UserItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        //await LoadLoginsAndRolesAsync(users);

        return new SearchResult<UserItemModel>
        {
            Items = users,
            Pagination = new PaginationModel
            {
                TotalCount = totalCount,
                TotalPages = totalPages,
                ItemsPerPage = safeItemsPerPage,
                CurrentPage = safePage
            }
        };
    }

    private async Task LoadLoginsAndRolesAsync(List<UserItemModel> users)
    {
        await context.UserLogins.ForEachAsync(login =>
        {
            var user = users.FirstOrDefault(u => u.Id == login.UserId);
            if (user != null)
            {
                user.LoginTypes.Add(login.LoginProvider);
            }
        });

        var identityUsers = await userManager.Users.AsNoTracking().ToListAsync();

        foreach (var identityUser in identityUsers)
        {
            var adminUser = users.FirstOrDefault(u => u.Id == identityUser.Id);
            if (adminUser != null)
            {
                var roles = await userManager.GetRolesAsync(identityUser);
                adminUser.Roles = roles.ToList();

                if (!string.IsNullOrEmpty(identityUser.PasswordHash))
                {
                    adminUser.LoginTypes.Add("Password");
                }
            }
        }
    }

    public async Task<UserItemModel> EditUserAsync(UserEditModel model)
    {
        var existing = await userManager.FindByIdAsync(model.Id.ToString());
        //existing = mapper.Map(model, existing);

        existing.Email = model.Email;
        existing.FirstName = model.FirstName;
        existing.LastName = model.LastName;

        if (model.Image != null)
        {
            imageService.DeleteImageAsync(existing.Image);
            existing.Image = await imageService.SaveImageAsync(model.Image);
        }

        if (model.Roles != null)
        {
            var currentRoles = await userManager.GetRolesAsync(existing);
            await userManager.RemoveFromRolesAsync(existing, currentRoles);
            await userManager.AddToRolesAsync(existing, model.Roles);
        }

        await userManager.UpdateAsync(existing);

        var updatedUser = mapper.Map<UserItemModel>(existing);

        return updatedUser;
    }

    public async Task<UserItemModel> GetUserById(int id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());

        if (user == null)
            return null;

        var adminUser = mapper.Map<UserItemModel>(user);

        await LoadLoginsAndRolesAsync(new List<UserItemModel> { adminUser });

        return adminUser;
    }

    public async Task DeleteUser(int id)
    {
        var user = await userManager.FindByIdAsync(id.ToString());

        if (user != null)
        {
            await userManager.DeleteAsync(user);
        }
    }

    public async Task SeedUsersAsync(string jsonPath)
    {
        if (!File.Exists(jsonPath))
        {
            Console.WriteLine($"Users seed file not found: {jsonPath}");
            return;
        }

        if (await context.Users.AnyAsync())
            return;

        try
        {
            var json = await File.ReadAllTextAsync(jsonPath);

            var users = JsonConvert.DeserializeObject<List<UserSeederModel>>(json);
            if (users == null || users.Count == 0)
                return;

            foreach(var user in users)
            {
                var entity = mapper.Map<UserEntity>(user);
                entity.Image = await imageService.SaveImageFromUrlAsync(user.ImagePath);
                var result = await userManager.CreateAsync(entity, user.Password);
                if (!result.Succeeded)
                {
                    Console.WriteLine("Error Create User {0}", user.Email);
                    continue;
                }
                foreach (var role in user.Roles)
                {
                    if (await roleManager.RoleExistsAsync(role))
                    {
                        await userManager.AddToRoleAsync(entity, role);
                    }
                    else
                    {
                        Console.WriteLine("Not Found Role {0}", role);
                    }
                }
            }
        }
        catch (JsonException ex)
        {
            Console.WriteLine($"JSON parse error: {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Seed users error: {ex.Message}");
        }
    }
}
