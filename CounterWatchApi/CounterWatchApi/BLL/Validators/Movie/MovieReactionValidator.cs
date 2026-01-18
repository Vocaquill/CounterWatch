using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Movie;

public class MovieReactionValidator : AbstractValidator<MovieReactionModel>
{
    public MovieReactionValidator(AppDbContext db)
    {
        RuleFor(x => x.MovieId)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("MovieId повинен бути більше 0")
            .MustAsync(async (movieId, cancellation) =>
                await db.Movies.AnyAsync(
                    m => m.Id == movieId && !m.IsDeleted,
                    cancellation))
            .WithMessage("Фільм не знайдено");
    }
}
