using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AllModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Date",
                table: "profileComments",
                newName: "Creation_Date");

            migrationBuilder.CreateTable(
                name: "artists",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Id_Artist_Spotify_API = table.Column<string>(type: "text", nullable: false),
                    Photo = table.Column<byte[]>(type: "bytea", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_artists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "albums",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Id_Album_Spotify_API = table.Column<string>(type: "text", nullable: false),
                    Cover = table.Column<byte[]>(type: "bytea", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Id_Artist_Internal = table.Column<string>(type: "text", nullable: false),
                    ArtistId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_albums", x => x.Id);
                    table.ForeignKey(
                        name: "FK_albums_artists_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "artists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "artistsComment",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Creation_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Artist_Internal = table.Column<string>(type: "text", nullable: false),
                    ArtistId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_artistsComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_artistsComment_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_artistsComment_artists_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "artists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "artistsRating",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Artist_Internal = table.Column<string>(type: "text", nullable: false),
                    ArtistId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_artistsRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_artistsRating_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_artistsRating_artists_ArtistId",
                        column: x => x.ArtistId,
                        principalTable: "artists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "albumsComment",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Creation_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Album_Internal = table.Column<string>(type: "text", nullable: false),
                    AlbumId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_albumsComment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_albumsComment_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_albumsComment_albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "albums",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "albumsRating",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Album_Internal = table.Column<string>(type: "text", nullable: false),
                    AlbumId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_albumsRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_albumsRating_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_albumsRating_albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "albums",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "songs",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Id_Song_Spotify_API = table.Column<string>(type: "text", nullable: false),
                    Id_Album_Internal = table.Column<string>(type: "text", nullable: false),
                    AlbumId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_songs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_songs_albums_AlbumId",
                        column: x => x.AlbumId,
                        principalTable: "albums",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "favouriteSongs",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Song_Internal = table.Column<string>(type: "text", nullable: false),
                    SongId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_favouriteSongs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_favouriteSongs_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_favouriteSongs_songs_SongId",
                        column: x => x.SongId,
                        principalTable: "songs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "scrobbles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Scrobble_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Song_Internal = table.Column<string>(type: "text", nullable: false),
                    SongId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_scrobbles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_scrobbles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_scrobbles_songs_SongId",
                        column: x => x.SongId,
                        principalTable: "songs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "songsComments",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Creation_Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Id_Sender = table.Column<string>(type: "text", nullable: false),
                    SenderId = table.Column<string>(type: "text", nullable: false),
                    Id_Song_Internal = table.Column<string>(type: "text", nullable: false),
                    SongId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_songsComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_songsComments_AspNetUsers_SenderId",
                        column: x => x.SenderId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_songsComments_songs_SongId",
                        column: x => x.SongId,
                        principalTable: "songs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "songsRating",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    Id_User = table.Column<string>(type: "text", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Id_Song_Internal = table.Column<string>(type: "text", nullable: false),
                    SongId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_songsRating", x => x.Id);
                    table.ForeignKey(
                        name: "FK_songsRating_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_songsRating_songs_SongId",
                        column: x => x.SongId,
                        principalTable: "songs",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_albums_ArtistId",
                table: "albums",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_albumsComment_AlbumId",
                table: "albumsComment",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_albumsComment_UserId",
                table: "albumsComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_albumsRating_AlbumId",
                table: "albumsRating",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_albumsRating_UserId",
                table: "albumsRating",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_artistsComment_ArtistId",
                table: "artistsComment",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_artistsComment_UserId",
                table: "artistsComment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_artistsRating_ArtistId",
                table: "artistsRating",
                column: "ArtistId");

            migrationBuilder.CreateIndex(
                name: "IX_artistsRating_UserId",
                table: "artistsRating",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_favouriteSongs_SongId",
                table: "favouriteSongs",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_favouriteSongs_UserId",
                table: "favouriteSongs",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_scrobbles_SongId",
                table: "scrobbles",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_scrobbles_UserId",
                table: "scrobbles",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_songs_AlbumId",
                table: "songs",
                column: "AlbumId");

            migrationBuilder.CreateIndex(
                name: "IX_songsComments_SenderId",
                table: "songsComments",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_songsComments_SongId",
                table: "songsComments",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_songsRating_SongId",
                table: "songsRating",
                column: "SongId");

            migrationBuilder.CreateIndex(
                name: "IX_songsRating_UserId",
                table: "songsRating",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "albumsComment");

            migrationBuilder.DropTable(
                name: "albumsRating");

            migrationBuilder.DropTable(
                name: "artistsComment");

            migrationBuilder.DropTable(
                name: "artistsRating");

            migrationBuilder.DropTable(
                name: "favouriteSongs");

            migrationBuilder.DropTable(
                name: "scrobbles");

            migrationBuilder.DropTable(
                name: "songsComments");

            migrationBuilder.DropTable(
                name: "songsRating");

            migrationBuilder.DropTable(
                name: "songs");

            migrationBuilder.DropTable(
                name: "albums");

            migrationBuilder.DropTable(
                name: "artists");

            migrationBuilder.RenameColumn(
                name: "Creation_Date",
                table: "profileComments",
                newName: "Date");
        }
    }
}
