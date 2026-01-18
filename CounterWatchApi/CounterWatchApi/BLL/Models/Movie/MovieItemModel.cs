using BLL.Models.Genre;

namespace BLL.Models.Movie;

public class MovieItemModel
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Slug { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string ReleaseDate { get; set; } = string.Empty;
    public string? ImdbRating { get; set; }

    public string? Image { get; set; }
    public string? Video { get; set; }
    public string? TrailerUrl { get; set; }
    public List<GenreItemModel> Genres { get; set; } = new();

    public int LikesCount { get; set; }
    public int DislikesCount { get; set; }

    public int UserRatingPercent =>
        LikesCount + DislikesCount == 0
            ? 0
            : (int)Math.Round(
                (double)LikesCount /
                (LikesCount + DislikesCount) * 100
            );

    public List<MovieCommentItemModel> Comments { get; set; } = new();
}
