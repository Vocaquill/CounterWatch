namespace BLL.Models.Movie;

public class MovieItemModel
{
    public long Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string? Slug { get; set; }
    public DateTime ReleaseDate { get; set; }

    public string? Image { get; set; }
    public string? Video { get; set; }
    public string? TrailerUrl { get; set; }

    public long GenreId { get; set; }
    public string GenreName { get; set; } = string.Empty;

    public decimal? ImdbRating { get; set; }
    public int LikesCount { get; set; }
    public int DislikesCount { get; set; }

    public int UserRatingPercent
    {
        get
        {
            int total = LikesCount + DislikesCount;
            return total == 0 ? 0 : (int)Math.Round((double)LikesCount / total * 100);
        }
    }

    public List<MovieCommentItemModel>? Comments { get; set; }
}
