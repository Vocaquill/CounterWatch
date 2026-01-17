using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Movie;

public class MovieCreateValidator : AbstractValidator<MovieCreateModel>
{
    public MovieCreateValidator(AppDbContext db)
    {
        RuleFor(x => x.Title)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Назва є обов'язковою")
            .MaximumLength(255).WithMessage("Назва повинна містити не більше 255 символів");

        RuleFor(x => x.Slug)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Слаг є обов'язковим")
            .MaximumLength(255).WithMessage("Слаг повинен містити не більше 255 символів")
            .MustAsync(async (slug, cancellation) =>
            {
                var normalized = slug!.Trim().ToLower().Replace(" ", "-");
                return !await db.Movies.AnyAsync(
                    m => !m.IsDeleted && m.Slug == normalized,
                    cancellation);
            })
            .WithMessage("Фільм з таким слагом вже існує");

        RuleFor(x => x.GenreId)
            .GreaterThan(0).WithMessage("Жанр є обов'язковим")
            .MustAsync(async (genreId, cancellation) =>
                await db.Genres.AnyAsync(
                    g => g.Id == genreId && !g.IsDeleted,
                    cancellation))
            .WithMessage("Обраний жанр не знайдено");

        RuleFor(x => x.Video)
            .NotNull().WithMessage("Відео є обов'язковим");

        RuleFor(x => x.ImdbRating)
            .InclusiveBetween(0, 10)
            .When(x => x.ImdbRating.HasValue)
            .WithMessage("IMDb рейтинг повинен бути в діапазоні від 0 до 10");

        RuleFor(x => x.ReleaseDate)
            .LessThanOrEqualTo(DateTime.UtcNow)
            .WithMessage("Дата релізу не може бути в майбутньому");

        RuleFor(x => x.TrailerUrl)
            .MaximumLength(255)
            .When(x => !string.IsNullOrWhiteSpace(x.TrailerUrl))
            .WithMessage("Посилання на трейлер занадто довге");
    }
}
