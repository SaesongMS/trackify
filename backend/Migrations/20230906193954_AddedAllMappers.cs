using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedAllMappers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_albumsRating_AspNetUsers_UserId",
                table: "albumsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsRating_AspNetUsers_UserId",
                table: "artistsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_AspNetUsers_UserId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_AspNetUsers_SenderId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_AspNetUsers_UserId",
                table: "songsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "songsRating",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "songsRating",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Song_Internal",
                table: "songsRating",
                newName: "id_song_internal");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "songsRating",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_Song_Internal",
                table: "songsComments",
                newName: "id_song_internal");

            migrationBuilder.RenameColumn(
                name: "Id_Sender",
                table: "songsComments",
                newName: "id_sender");

            migrationBuilder.RenameColumn(
                name: "Creation_Date",
                table: "songsComments",
                newName: "creation_date");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "songsComments",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "songsComments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "songs",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Id_Song_Spotify_API",
                table: "songs",
                newName: "id_song_spotify_api");

            migrationBuilder.RenameColumn(
                name: "Id_Album_Internal",
                table: "songs",
                newName: "id_album_internal");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "songs",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "songs",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_Sender",
                table: "profileComments",
                newName: "id_sender");

            migrationBuilder.RenameColumn(
                name: "Id_Recipient",
                table: "profileComments",
                newName: "id_recipient");

            migrationBuilder.RenameColumn(
                name: "Creation_Date",
                table: "profileComments",
                newName: "creation_date");

            migrationBuilder.RenameColumn(
                name: "Comment",
                table: "profileComments",
                newName: "comment");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "profileComments",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_Follower",
                table: "follows",
                newName: "id_follower");

            migrationBuilder.RenameColumn(
                name: "Id_Followed",
                table: "follows",
                newName: "id_followed");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "follows",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "favouriteSongs",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Song_Internal",
                table: "favouriteSongs",
                newName: "id_song_internal");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "favouriteSongs",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "artistsRating",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "artistsRating",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Artist_Internal",
                table: "artistsRating",
                newName: "id_artist_internal");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "artistsRating",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "artistsComment",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Artist_Internal",
                table: "artistsComment",
                newName: "id_artist_internal");

            migrationBuilder.RenameColumn(
                name: "Creation_Date",
                table: "artistsComment",
                newName: "creation_date");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "artistsComment",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "artistsComment",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Photo",
                table: "artists",
                newName: "photo");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "artists",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id_Artist_Spotify_API",
                table: "artists",
                newName: "id_artist_spotify_api");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "artists",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "artists",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Rating",
                table: "albumsRating",
                newName: "rating");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "albumsRating",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Album_Internal",
                table: "albumsRating",
                newName: "id_album_internal");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "albumsRating",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Id_User",
                table: "albumsComment",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "Id_Album_Internal",
                table: "albumsComment",
                newName: "id_album_internal");

            migrationBuilder.RenameColumn(
                name: "Creation_Date",
                table: "albumsComment",
                newName: "creation_date");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "albumsComment",
                newName: "content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "albumsComment",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "albums",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id_Artist_Internal",
                table: "albums",
                newName: "id_artist_internal");

            migrationBuilder.RenameColumn(
                name: "Id_Album_Spotify_API",
                table: "albums",
                newName: "id_album_spotify_api");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "albums",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Cover",
                table: "albums",
                newName: "cover");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "albums",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "songsRating",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

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
                name: "SenderId",
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
                table: "favouriteSongs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "SongId",
                table: "favouriteSongs",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "artistsRating",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "artistsComment",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "albumsRating",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "albumsComment",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_albumsRating_AspNetUsers_UserId",
                table: "albumsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_artistsRating_AspNetUsers_UserId",
                table: "artistsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_AspNetUsers_UserId",
                table: "favouriteSongs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs",
                column: "AlbumId",
                principalTable: "albums",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_AspNetUsers_SenderId",
                table: "songsComments",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsRating_AspNetUsers_UserId",
                table: "songsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_albumsRating_AspNetUsers_UserId",
                table: "albumsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsRating_AspNetUsers_UserId",
                table: "artistsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_AspNetUsers_UserId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs");

            migrationBuilder.DropForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_AspNetUsers_SenderId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_AspNetUsers_UserId",
                table: "songsRating");

            migrationBuilder.DropForeignKey(
                name: "FK_songsRating_songs_SongId",
                table: "songsRating");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "songsRating",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "songsRating",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_song_internal",
                table: "songsRating",
                newName: "Id_Song_Internal");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "songsRating",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_song_internal",
                table: "songsComments",
                newName: "Id_Song_Internal");

            migrationBuilder.RenameColumn(
                name: "id_sender",
                table: "songsComments",
                newName: "Id_Sender");

            migrationBuilder.RenameColumn(
                name: "creation_date",
                table: "songsComments",
                newName: "Creation_Date");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "songsComments",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "songsComments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "songs",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "id_song_spotify_api",
                table: "songs",
                newName: "Id_Song_Spotify_API");

            migrationBuilder.RenameColumn(
                name: "id_album_internal",
                table: "songs",
                newName: "Id_Album_Internal");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "songs",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "songs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_sender",
                table: "profileComments",
                newName: "Id_Sender");

            migrationBuilder.RenameColumn(
                name: "id_recipient",
                table: "profileComments",
                newName: "Id_Recipient");

            migrationBuilder.RenameColumn(
                name: "creation_date",
                table: "profileComments",
                newName: "Creation_Date");

            migrationBuilder.RenameColumn(
                name: "comment",
                table: "profileComments",
                newName: "Comment");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "profileComments",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_follower",
                table: "follows",
                newName: "Id_Follower");

            migrationBuilder.RenameColumn(
                name: "id_followed",
                table: "follows",
                newName: "Id_Followed");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "follows",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "favouriteSongs",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_song_internal",
                table: "favouriteSongs",
                newName: "Id_Song_Internal");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "favouriteSongs",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "artistsRating",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "artistsRating",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_artist_internal",
                table: "artistsRating",
                newName: "Id_Artist_Internal");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "artistsRating",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "artistsComment",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_artist_internal",
                table: "artistsComment",
                newName: "Id_Artist_Internal");

            migrationBuilder.RenameColumn(
                name: "creation_date",
                table: "artistsComment",
                newName: "Creation_Date");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "artistsComment",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "artistsComment",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "photo",
                table: "artists",
                newName: "Photo");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "artists",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id_artist_spotify_api",
                table: "artists",
                newName: "Id_Artist_Spotify_API");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "artists",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "artists",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "rating",
                table: "albumsRating",
                newName: "Rating");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "albumsRating",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_album_internal",
                table: "albumsRating",
                newName: "Id_Album_Internal");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "albumsRating",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "albumsComment",
                newName: "Id_User");

            migrationBuilder.RenameColumn(
                name: "id_album_internal",
                table: "albumsComment",
                newName: "Id_Album_Internal");

            migrationBuilder.RenameColumn(
                name: "creation_date",
                table: "albumsComment",
                newName: "Creation_Date");

            migrationBuilder.RenameColumn(
                name: "content",
                table: "albumsComment",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "albumsComment",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "albums",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id_artist_internal",
                table: "albums",
                newName: "Id_Artist_Internal");

            migrationBuilder.RenameColumn(
                name: "id_album_spotify_api",
                table: "albums",
                newName: "Id_Album_Spotify_API");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "albums",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "cover",
                table: "albums",
                newName: "Cover");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "albums",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "songsRating",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

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
                name: "SenderId",
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
                table: "favouriteSongs",
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
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "artistsRating",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "artistsComment",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "albumsRating",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "albumsComment",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_albumsRating_AspNetUsers_UserId",
                table: "albumsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_artistsRating_AspNetUsers_UserId",
                table: "artistsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_AspNetUsers_UserId",
                table: "favouriteSongs",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_favouriteSongs_songs_SongId",
                table: "favouriteSongs",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songs_albums_AlbumId",
                table: "songs",
                column: "AlbumId",
                principalTable: "albums",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_AspNetUsers_SenderId",
                table: "songsComments",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songsComments_songs_SongId",
                table: "songsComments",
                column: "SongId",
                principalTable: "songs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_songsRating_AspNetUsers_UserId",
                table: "songsRating",
                column: "UserId",
                principalTable: "AspNetUsers",
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
    }
}
