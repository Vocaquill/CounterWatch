using DAL.Entities.Genre;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Movie;

[Table("tbl_movie_genres")]
public class MovieGenreEntity
{
    public long MovieId { get; set; }
    public long GenreId { get; set; }

    public virtual MovieEntity Movie { get; set; }
    public virtual GenreEntity Genre { get; set; }
}
