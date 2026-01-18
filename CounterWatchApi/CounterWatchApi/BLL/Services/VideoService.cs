using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;

namespace BLL.Services;

public class VideoService : IVideoService
{
    private readonly string videosDir;
    private readonly string[] allowedExtensions = { ".mp4", ".mov", ".avi" };

    public VideoService(IConfiguration configuration)
    {
        videosDir = Path.Combine(
            Directory.GetCurrentDirectory(),
            configuration["VideosDir"]!
        );

        Directory.CreateDirectory(videosDir);
    }

    public async Task<string> SaveVideoAsync(IFormFile file)
    {
        var ext = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(ext))
            throw new InvalidOperationException("Unsupported video format");

        var fileName = $"{Guid.NewGuid()}{ext}";
        var path = Path.Combine(videosDir, fileName);

        await using var stream = new FileStream(path, FileMode.Create);
        await file.CopyToAsync(stream);

        return fileName;
    }

    public Task DeleteVideoAsync(string name)
    {
        var path = Path.Combine(videosDir, name);
        if (File.Exists(path))
            File.Delete(path);

        return Task.CompletedTask;
    }
}
