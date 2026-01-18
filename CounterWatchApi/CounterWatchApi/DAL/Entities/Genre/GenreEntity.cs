using DAL.Entities.Common;
using DAL.Entities.Movie;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Genre;

[Table("tbl_genres")]
public class GenreEntity : BaseEntity<long>
{
    [StringLength(255)]
    public string Name { get; set; } = string.Empty;

    [StringLength(255)]
    public string Slug { get; set; } = string.Empty;

    [StringLength(255)]
    public string? Image { get; set; }

    public virtual ICollection<MovieGenreEntity>? MovieGenres { get; set; }
}

