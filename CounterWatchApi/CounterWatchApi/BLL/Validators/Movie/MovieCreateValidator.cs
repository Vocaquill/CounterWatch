using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

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

        RuleFor(x => x.GenreIds)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Потрібно обрати хоча б один жанр")
            .MustAsync(async (genreIds, cancellation) =>
            {
                var count = await db.Genres
                    .CountAsync(g =>
                        genreIds.Contains(g.Id) && !g.IsDeleted,
                        cancellation);

                return count == genreIds.Distinct().Count();
            })
            .WithMessage("Один або кілька жанрів не знайдено");

        RuleFor(x => x.Video)
            .NotNull().WithMessage("Відео є обов'язковим");

        RuleFor(x => x.ImdbRating)
            .Must(value =>
                string.IsNullOrWhiteSpace(value) ||
                (decimal.TryParse(
                    value,
                    NumberStyles.Number,
                    CultureInfo.InvariantCulture,
                    out var rating) &&
                 rating >= 0 && rating <= 10))
            .WithMessage("IMDb рейтинг повинен бути числом від 0 до 10");

        RuleFor(x => x.ReleaseDate)
            .Must(value =>
                DateTime.TryParseExact(
                    value,
                    "yyyy-MM-dd",
                    CultureInfo.InvariantCulture,
                    DateTimeStyles.None,
                    out var date) &&
                date <= DateTime.UtcNow)
            .WithMessage("Дата релізу повинна бути у форматі yyyy-MM-dd і не в майбутньому");

        RuleFor(x => x.TrailerUrl)
            .MaximumLength(255)
            .When(x => !string.IsNullOrWhiteSpace(x.TrailerUrl))
            .WithMessage("Посилання на трейлер занадто довге");
    }
}
