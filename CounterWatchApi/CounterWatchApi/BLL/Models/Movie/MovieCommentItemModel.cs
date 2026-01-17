namespace BLL.Models.Movie;

public class MovieCommentItemModel
{
    public long Id { get; set; }
    public long UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Text { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
}
