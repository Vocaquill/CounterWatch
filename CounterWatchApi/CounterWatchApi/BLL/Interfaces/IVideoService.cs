using Microsoft.AspNetCore.Http;

namespace BLL.Interfaces;

public interface IVideoService
{
    Task<string> SaveVideoAsync(IFormFile file);
    Task DeleteVideoAsync(string name);
}