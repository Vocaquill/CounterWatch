namespace BLL.Models.Movie;

public class MovieSeederModel
{
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ReleaseDate { get; set; } = string.Empty;
    public string ImdbRating { get; set; } = string.Empty;
    public long[] Genres { get; set; } = Array.Empty<long>();
    public string? ImageFile { get; set; }
    public string? VideoFile { get; set; }
}
