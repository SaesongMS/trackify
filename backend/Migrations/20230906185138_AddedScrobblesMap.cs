using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedScrobblesMap : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_scrobbles_AspNetUsers_UserId",
                table: "scrobbles");

            migrationBuilder.DropForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating");

            migrationBuilder.RenameColumn(
                name: "Scrobble_Date",
                table: "scrobbles",
                newName: "scrobble_date");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "scrobbles",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Song_Internal",
                table: "scrobbles",
                newName: "id_song_internal");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "scrobbles",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "songsRating",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "songsComments",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "AlbumId",
                table: "songs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "scrobbles",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "favouriteSongs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_scrobbles_AspNetUsers_UserId",
                table: "scrobbles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs",
                column: "AlbumId",
                principalTable: "albums",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_scrobbles_AspNetUsers_UserId",
                table: "scrobbles");

            migrationBuilder.DropForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating");

            migrationBuilder.RenameColumn(
                name: "scrobble_date",
                table: "scrobbles",
                newName: "Scrobble_Date");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "scrobbles",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_song_internal",
                table: "scrobbles",
                newName: "Id_Song_Internal");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "scrobbles",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "songsRating",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "songsComments",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "AlbumId",
                table: "songs",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "scrobbles",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "favouriteSongs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_scrobbles_AspNetUsers_UserId",
                table: "scrobbles",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs",
                column: "AlbumId",
                principalTable: "albums",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id");
        }
    }
}
