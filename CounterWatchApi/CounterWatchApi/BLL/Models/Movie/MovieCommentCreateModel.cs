namespace BLL.Models.Movie;

public class MovieCommentCreateModel
{
    public long MovieId { get; set; }
    public string Text { get; set; } = string.Empty;
}