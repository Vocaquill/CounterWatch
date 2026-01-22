using BLL.Extensions;
using BLL.Interfaces;
using BLL.Services;
using CounterWatchApi.Filters;
using CounterWatchApi.Jobs;
using DAL;
using DAL.Entities.Identity;
using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using Quartz;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowViteFrame", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "https://counterwatch.itstep.click")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, context, cancellationToken) =>
    {
        document.Components ??= new OpenApiComponents();
        document.Components.SecuritySchemes ??= new Dictionary<string, IOpenApiSecurityScheme>();

        document.Components.SecuritySchemes["Bearer"] = new OpenApiSecurityScheme
        {
            Type = SecuritySchemeType.Http,
            Scheme = "bearer",
            BearerFormat = "JWT",
            In = ParameterLocation.Header,
            Name = "Authorization",
            Description = "JWT Authorization header using the Bearer scheme. Example: \"Bearer {token}\""
        };

        document.Security = [
            new OpenApiSecurityRequirement
            {
                {
                    new OpenApiSecuritySchemeReference("Bearer"),
                    []
                }
            }
        ];

        document.SetReferenceHostDocument();

        document.Servers = new List<OpenApiServer>
        {
            new OpenApiServer
            {
                Url = "https://counterwatch.itstep.click/api",
                Description = "Production server"
            }
        };

        return Task.CompletedTask;
    });
});


builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services
    .AddIdentity<UserEntity, RoleEntity>(options =>
    {
        options.Password.RequiredLength = 6;
        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireUppercase = false;
        options.Password.RequireNonAlphanumeric = false;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateIssuerSigningKey = true,
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero,
        IssuerSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
    };
});

builder.Services.AddControllers(options =>
{
    options.Filters.Add<ValidationFilter>();
});

builder.Services.AddOpenApi();

builder.Services.AddScoped<IImageService, ImageService>();
builder.Services.AddScoped<IGenresService, GenreService>();
builder.Services.AddScoped<IDbSeeder, DbSeeder>();

builder.Services.AddQuartz(q => {
    var jobKey = new JobKey(nameof(DbSeedJob));
    q.AddJob<DbSeedJob>(opts => opts.WithIdentity(jobKey));

    q.AddTrigger(opts => opts
        .ForJob(jobKey)
        .WithIdentity($"{nameof(DbSeedJob)}-trigger")
        .StartNow());
});
builder.Services.AddQuartzHostedService(options =>
{
    options.WaitForJobsToComplete = true;
});

//builder.Services.Configure<FormOptions>(options =>
//{
//    options.MultipartBodyLengthLimit = 5L * 1024 * 1024 * 1024; // 5 GB
//    options.MultipartHeadersLengthLimit = int.MaxValue;
//});

builder.Services.AddScoped<IJwtTokenService, JwtTokenService>();
builder.Services.AddScoped<ISmtpService, SmtpService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IVideoService, VideoService>();
builder.Services.AddScoped<IMoviesService, MoviesService>();

builder.WebHost.ConfigureKestrel(options =>
{
    options.Limits.MaxRequestBodySize = null;
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = long.MaxValue;
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseRouting();

app.UseCors("AllowViteFrame");

var dir = builder.Configuration["ImagesDir"];
var path = Path.Combine(Directory.GetCurrentDirectory(), dir);
Directory.CreateDirectory(path);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(path),
    RequestPath = $"/{dir}"
});

var videosDir = builder.Configuration["VideosDir"];
var videosPath = Path.Combine(Directory.GetCurrentDirectory(), videosDir);
Directory.CreateDirectory(videosPath);

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(videosPath),
    RequestPath = $"/{videosDir}"
});

app.UseSwaggerUI(options =>
{
    options.RoutePrefix = "swagger";
    //options.SwaggerEndpoint("/openapi/v1.json", "JustDoIt API v1");
    options.SwaggerEndpoint("/api/openapi/v1.json", "JustDoIt API v1");
    options.OAuthUsePkce();
});

app.UseAuthentication();
app.UseAuthorization();

app.MapOpenApi();
app.MapControllers();

app.Run();
