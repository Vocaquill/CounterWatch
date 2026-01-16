using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class add_movie_tables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tbl_movies",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    Slug = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ReleaseDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    GenreId = table.Column<long>(type: "bigint", nullable: false),
                    Image = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    Video = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    TrailerUrl = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
                    ImdbRating = table.Column<decimal>(type: "numeric(3,1)", nullable: true),
                    LikesCount = table.Column<int>(type: "integer", nullable: false),
                    DislikesCount = table.Column<int>(type: "integer", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_movies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_movies_tbl_genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "tbl_genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_comments",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MovieId = table.Column<long>(type: "bigint", nullable: false),
                    Text = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_comments_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_comments_tbl_movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "tbl_movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tbl_movie_reactions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    MovieId = table.Column<long>(type: "bigint", nullable: false),
                    UserId = table.Column<long>(type: "bigint", nullable: false),
                    IsLike = table.Column<bool>(type: "boolean", nullable: false),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DateCreated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_movie_reactions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_tbl_movie_reactions_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_movie_reactions_tbl_movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "tbl_movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_comments_MovieId",
                table: "tbl_comments",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_comments_UserId",
                table: "tbl_comments",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_movie_reactions_MovieId",
                table: "tbl_movie_reactions",
                column: "MovieId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_movie_reactions_UserId",
                table: "tbl_movie_reactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_tbl_movies_GenreId",
                table: "tbl_movies",
                column: "GenreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_comments");

            migrationBuilder.DropTable(
                name: "tbl_movie_reactions");

            migrationBuilder.DropTable(
                name: "tbl_movies");
        }
    }
}
