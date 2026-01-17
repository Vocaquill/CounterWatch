using DAL.Entities.Common;
using DAL.Entities.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Movie;

[Table("tbl_comments")]
public class CommentEntity : BaseEntity<long>
{
    [Required]
    public long MovieId { get; set; }
    public MovieEntity Movie { get; set; } = null!;

    [Required]
    [StringLength(1000)]
    public string Text { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    [ForeignKey("User")]
    public long UserId { get; set; }
    public UserEntity User { get; set; } = null!;
}
