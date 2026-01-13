using BLL.Models.Genre;
using DAL;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace BLL.Validators.Genre;

public class GenreUpdateValidator : AbstractValidator<GenreEditModel>
{
    public GenreUpdateValidator(AppDbContext db)
    {
        RuleFor(x => x.Id)
            .Cascade(CascadeMode.Stop)
            .GreaterThan(0).WithMessage("Id повинен бути більше 0")
            .MustAsync(async (id, cancellation) =>
                await db.Genres.AnyAsync(
                    g => g.Id == id && !g.IsDeleted,
                    cancellation))
            .WithMessage("Жанр не знайдено");

        RuleFor(x => x.Name)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Назва є обов'язковою")
            .MaximumLength(250).WithMessage("Назва повинна містити не більше 250 символів")
            .MustAsync(async (model, name, cancellation) =>
                !await db.Genres.AnyAsync(
                    g => !g.IsDeleted &&
                         g.Name.ToLower().Trim() == name!.Trim().ToLower() &&
                         g.Id != model.Id,
                    cancellation))
            .WithMessage("Інший жанр з такою назвою вже існує");

        RuleFor(x => x.Slug)
            .Cascade(CascadeMode.Stop)
            .NotEmpty().WithMessage("Слаг є обов'язковим")
            .MaximumLength(250).WithMessage("Слаг повинен містити не більше 250 символів")
            .MustAsync(async (model, slug, cancellation) =>
            {
                var normalized = slug!.Trim().ToLower().Replace(" ", "-");
                return !await db.Genres.AnyAsync(
                    g => !g.IsDeleted &&
                         g.Slug == normalized &&
                         g.Id != model.Id,
                    cancellation);
            })
            .WithMessage("Інший жанр з таким слагом вже існує");
    }
}
