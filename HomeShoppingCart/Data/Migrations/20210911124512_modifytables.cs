using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeShoppingCart.Migrations
{
    public partial class modifytables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CartId",
                table: "ShopItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AccessCount",
                table: "Items",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ShopItem_CartId",
                table: "ShopItem",
                column: "CartId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItem_Carts_CartId",
                table: "ShopItem",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItem_Carts_CartId",
                table: "ShopItem");

            migrationBuilder.DropIndex(
                name: "IX_ShopItem_CartId",
                table: "ShopItem");

            migrationBuilder.DropColumn(
                name: "CartId",
                table: "ShopItem");

            migrationBuilder.DropColumn(
                name: "AccessCount",
                table: "Items");
        }
    }
}
