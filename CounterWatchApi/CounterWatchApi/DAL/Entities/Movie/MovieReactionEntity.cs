using DAL.Entities.Common;
using DAL.Entities.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Movie;

[Table("tbl_movie_reactions")]
public class MovieReactionEntity : BaseEntity<long>
{
    public long MovieId { get; set; }
    public MovieEntity Movie { get; set; } = null!;

    public long UserId { get; set; }
    public UserEntity User { get; set; } = null!;

    public bool IsLike { get; set; }
}