using DAL.Entities.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

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
}

