using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ContactManagementSys.Migrations
{
    /// <inheritdoc />
    public partial class last : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contacts_Users_userId",
                table: "Contacts");

            migrationBuilder.DropIndex(
                name: "IX_Contacts_userId",
                table: "Contacts");

            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "Contacts",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "userId",
                table: "Contacts",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_Contacts_userId",
                table: "Contacts",
                column: "userId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contacts_Users_userId",
                table: "Contacts",
                column: "userId",
                principalTable: "Users",
                principalColumn: "userId");
        }
    }
}
