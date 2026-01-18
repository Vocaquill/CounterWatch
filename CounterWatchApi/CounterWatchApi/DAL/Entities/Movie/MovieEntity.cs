using DAL.Entities.Common;
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

    [StringLength(1000)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public DateTime ReleaseDate { get; set; }

    [StringLength(255)]
    public string? Image { get; set; }

    [StringLength(255)]
    public string? Video { get; set; }

    [StringLength(255)]
    public string? TrailerUrl { get; set; }

    [Column(TypeName = "decimal(3,1)")]
    public decimal? ImdbRating { get; set; }

    public virtual ICollection<MovieGenreEntity>? MovieGenres { get; set; } = new List<MovieGenreEntity>();

    public ICollection<CommentEntity> Comments { get; set; } = new List<CommentEntity>();
    public ICollection<MovieReactionEntity> Reactions { get; set; } = new List<MovieReactionEntity>();
}