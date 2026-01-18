using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    /// <inheritdoc />
    public partial class adddescriptiontomovie : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tbl_movies_tbl_genres_GenreId",
                table: "tbl_movies");

            migrationBuilder.DropIndex(
                name: "IX_tbl_movies_GenreId",
                table: "tbl_movies");

            migrationBuilder.DropColumn(
                name: "GenreId",
                table: "tbl_movies");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "tbl_movies",
                type: "character varying(1000)",
                maxLength: 1000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "tbl_movie_genres",
                columns: table => new
                {
                    MovieId = table.Column<long>(type: "bigint", nullable: false),
                    GenreId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tbl_movie_genres", x => new { x.MovieId, x.GenreId });
                    table.ForeignKey(
                        name: "FK_tbl_movie_genres_tbl_genres_GenreId",
                        column: x => x.GenreId,
                        principalTable: "tbl_genres",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tbl_movie_genres_tbl_movies_MovieId",
                        column: x => x.MovieId,
                        principalTable: "tbl_movies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tbl_movie_genres_GenreId",
                table: "tbl_movie_genres",
                column: "GenreId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tbl_movie_genres");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "tbl_movies");

            migrationBuilder.AddColumn<long>(
                name: "GenreId",
                table: "tbl_movies",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_tbl_movies_GenreId",
                table: "tbl_movies",
                column: "GenreId");

            migrationBuilder.AddForeignKey(
                name: "FK_tbl_movies_tbl_genres_GenreId",
                table: "tbl_movies",
                column: "GenreId",
                principalTable: "tbl_genres",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
