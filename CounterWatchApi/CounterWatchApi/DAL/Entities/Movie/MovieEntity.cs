using DAL.Entities.Common;
using DAL.Entities.Genre;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Movie;

[Table("tbl_movies")]
public class MovieEntity : BaseEntity<long>
{
    [Required]
    [StringLength(255)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(255)]
    public string Slug { get; set; } = string.Empty;

    [Required]
    public DateTime ReleaseDate { get; set; }

    [ForeignKey(nameof(Genre))]
    public long GenreId { get; set; }
    public GenreEntity Genre { get; set; } = null!;

    [StringLength(255)]
    public string? Image { get; set; }

    [StringLength(255)]
    public string? Video { get; set; }

    [StringLength(255)]
    public string? TrailerUrl { get; set; }

    [Column(TypeName = "decimal(3,1)")]
    public decimal? ImdbRating { get; set; }

    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<MovieReactionEntity> Reactions { get; set; } = new List<MovieReactionEntity>();
}