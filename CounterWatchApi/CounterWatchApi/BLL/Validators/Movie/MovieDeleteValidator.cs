using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Movie;

public class MovieDeleteValidator : AbstractValidator<MovieDeleteModel>
{
    public MovieDeleteValidator(AppDbContext db)
    {
        RuleFor(x => x.Id)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("Id повинен бути більше 0")
            .MustAsync(async (id, cancellation) =>
                await db.Movies.AnyAsync(
                    m => m.Id == id && !m.IsDeleted,
                    cancellation))
            .WithMessage("Фільм з таким Id не знайдено");
    }
}
