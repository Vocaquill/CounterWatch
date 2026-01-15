using BLL.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Xabe.FFmpeg;

namespace BLL.Services
{
    public class VideoService : IVideoService
    {
        private readonly string videosDir;
        private readonly string[] allowedExtensions = { ".mp4", ".mov", ".avi" };

        public VideoService(IConfiguration configuration)
        {
            videosDir = Path.Combine(Directory.GetCurrentDirectory(), configuration["VideosDir"] ?? "Videos");
            if (!Directory.Exists(videosDir))
                Directory.CreateDirectory(videosDir);

            FFmpeg.SetExecutablesPath(Path.Combine(Directory.GetCurrentDirectory(), "ffmpeg"));
        }

        public async Task<string> SaveVideoAsync(IFormFile file)
        {
            var ext = Path.GetExtension(file.FileName).ToLower();
            if (!allowedExtensions.Contains(ext))
                throw new InvalidOperationException("Unsupported video format");

            var tempFileName = $"{Guid.NewGuid()}{ext}";
            var tempPath = Path.Combine(videosDir, tempFileName);
            await using (var stream = new FileStream(tempPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var outputFileName = $"{Guid.NewGuid()}.mp4";
            var outputPath = Path.Combine(videosDir, outputFileName);

            var conversion = FFmpeg.Conversions.New()
                .AddParameter($"-i \"{tempPath}\"")
                .SetOutput(outputPath);

            await conversion.Start();

            if (File.Exists(tempPath))
                File.Delete(tempPath);

            return outputFileName;
        }

        public Task DeleteVideoAsync(string name)
        {
            var path = Path.Combine(videosDir, name);
            if (File.Exists(path))
                File.Delete(path);

            return Task.CompletedTask;
        }
    }
}
