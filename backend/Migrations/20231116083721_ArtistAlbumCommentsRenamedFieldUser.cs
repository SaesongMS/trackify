using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class ArtistAlbumCommentsRenamedFieldUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "artistsComment",
                newName: "id_sender");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "artistsComment",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_artistsComment_UserId",
                table: "artistsComment",
                newName: "IX_artistsComment_SenderId");

            migrationBuilder.RenameColumn(
                name: "id_user",
                table: "albumsComment",
                newName: "id_sender");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "albumsComment",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_albumsComment_UserId",
                table: "albumsComment",
                newName: "IX_albumsComment_SenderId");

            migrationBuilder.AddForeignKey(
                name: "FK_albumsComment_AspNetUsers_SenderId",
                table: "albumsComment",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_artistsComment_AspNetUsers_SenderId",
                table: "artistsComment",
                column: "SenderId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_albumsComment_AspNetUsers_SenderId",
                table: "albumsComment");

            migrationBuilder.DropForeignKey(
                name: "FK_artistsComment_AspNetUsers_SenderId",
                table: "artistsComment");

            migrationBuilder.RenameColumn(
                name: "id_sender",
                table: "artistsComment",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "artistsComment",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_artistsComment_SenderId",
                table: "artistsComment",
                newName: "IX_artistsComment_UserId");

            migrationBuilder.RenameColumn(
                name: "id_sender",
                table: "albumsComment",
                newName: "id_user");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "albumsComment",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_albumsComment_SenderId",
                table: "albumsComment",
                newName: "IX_albumsComment_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_albumsComment_AspNetUsers_UserId",
                table: "albumsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_artistsComment_AspNetUsers_UserId",
                table: "artistsComment",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
