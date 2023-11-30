using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddedFollowedForeignKeyToFollow : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_follows_AspNetUsers_FollowerId",
                table: "follows");

            migrationBuilder.AlterColumn<string>(
                name: "FollowerId",
                table: "follows",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_follows_id_followed",
                table: "follows",
                column: "id_followed");

            migrationBuilder.AddForeignKey(
                name: "FK_follows_AspNetUsers_FollowerId",
                table: "follows",
                column: "FollowerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_follows_AspNetUsers_id_followed",
                table: "follows",
                column: "id_followed",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_follows_AspNetUsers_FollowerId",
                table: "follows");

            migrationBuilder.DropForeignKey(
                name: "FK_follows_AspNetUsers_id_followed",
                table: "follows");

            migrationBuilder.DropIndex(
                name: "IX_follows_id_followed",
                table: "follows");

            migrationBuilder.AlterColumn<string>(
                name: "FollowerId",
                table: "follows",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_follows_AspNetUsers_FollowerId",
                table: "follows",
                column: "FollowerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
