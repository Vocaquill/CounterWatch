using BLL.Models.Movie;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BLL.Validators.Movie;

public class MovieEditValidator : AbstractValidator<MovieEditModel>
{
    public MovieEditValidator(AppDbContext db)
    {
        RuleFor(x => x.Id)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("Id повинен бути більше 0")
            .MustAsync(async (id, cancellation) =>
                await db.Movies.AnyAsync(
                    m => m.Id == id && !m.IsDeleted,
                    cancellation))
            .WithMessage("Фільм не знайдено");

        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Назва є обов'язковою")
            .MaximumLength(255).WithMessage("Назва повинна містити не більше 255 символів");

        RuleFor(x => x.Slug)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Слаг є обов'язковим")
            .MaximumLength(255).WithMessage("Слаг повинен містити не більше 255 символів")
            .MustAsync(async (model, slug, cancellation) =>
            {
                var normalized = slug!.Trim().ToLower().Replace(" ", "-");
                return !await db.Movies.AnyAsync(
                    m => !m.IsDeleted &&
                         m.Slug == normalized &&
                         m.Id != model.Id,
                    cancellation);
            })
            .WithMessage("Інший фільм з таким слагом вже існує");

        // 🔥 СПИСОК ЖАНРІВ
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
