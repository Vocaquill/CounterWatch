using BLL.Models.Search;
using BLL.Models.User;

namespace BLL.Interfaces;

public interface IUserService
{
    Task<List<UserItemModel>> GetAllUsersAsync();
    Task<SearchResult<UserItemModel>> SearchUsersAsync(UserSearchModel model);
    Task<UserItemModel> GetUserById(int id);
    Task DeleteUser(int id);
    Task<UserItemModel> EditUserAsync(UserEditModel model);
    Task SeedUsersAsync(string jsonPath);
}
