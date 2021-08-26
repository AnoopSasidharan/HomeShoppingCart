using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeShoppingCart.Migrations
{
    public partial class dbnormalize : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "ShopItem");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ShopItem");

            migrationBuilder.AddColumn<int>(
                name: "ItemId",
                table: "ShopItem",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ShopItem_ItemId",
                table: "ShopItem",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItem_Items_ItemId",
                table: "ShopItem",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItem_Items_ItemId",
                table: "ShopItem");

            migrationBuilder.DropIndex(
                name: "IX_ShopItem_ItemId",
                table: "ShopItem");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "ShopItem");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ShopItem",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ShopItem",
                type: "TEXT",
                nullable: true);
        }
    }
}
