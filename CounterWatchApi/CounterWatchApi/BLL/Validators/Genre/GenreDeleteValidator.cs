using BLL.Models.Genre;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Genre;

public class GenreDeleteValidator : AbstractValidator<GenreDeleteModel>
{
    public GenreDeleteValidator(AppDbContext db)
    {
        RuleFor(x => x.Id)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("Id повинен бути більше 0")
            .MustAsync(async (id, cancellation) =>
                await db.Genres.AnyAsync(
                    g => g.Id == id && !g.IsDeleted,
                    cancellation))
            .WithMessage("Жанр з таким Id не знайдено");
    }
}
