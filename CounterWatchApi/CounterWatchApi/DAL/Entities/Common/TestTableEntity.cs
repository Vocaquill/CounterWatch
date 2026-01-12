using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Entities.Common;

[Table("tbl_test")]
public class TestTableEntity : BaseEntity<long>
{
    public string Text { get; set; } = string.Empty;
}
