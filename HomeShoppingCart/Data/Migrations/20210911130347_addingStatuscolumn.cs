using Microsoft.EntityFrameworkCore.Migrations;

namespace HomeShoppingCart.Migrations
{
    public partial class addingStatuscolumn : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItem_Carts_CartId",
                table: "ShopItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopItem_Items_ItemId",
                table: "ShopItem");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopItem_Shops_ShopId",
                table: "ShopItem");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopItem",
                table: "ShopItem");

            migrationBuilder.RenameTable(
                name: "ShopItem",
                newName: "ShopItems");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItem_ShopId",
                table: "ShopItems",
                newName: "IX_ShopItems_ShopId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItem_ItemId",
                table: "ShopItems",
                newName: "IX_ShopItems_ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItem_CartId",
                table: "ShopItems",
                newName: "IX_ShopItems_CartId");

            migrationBuilder.AddColumn<bool>(
                name: "IsBagged",
                table: "ShopItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ShopItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopItems",
                table: "ShopItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItems_Carts_CartId",
                table: "ShopItems",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItems_Items_ItemId",
                table: "ShopItems",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItems_Shops_ShopId",
                table: "ShopItems",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ShopItems_Carts_CartId",
                table: "ShopItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopItems_Items_ItemId",
                table: "ShopItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ShopItems_Shops_ShopId",
                table: "ShopItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ShopItems",
                table: "ShopItems");

            migrationBuilder.DropColumn(
                name: "IsBagged",
                table: "ShopItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "ShopItems");

            migrationBuilder.RenameTable(
                name: "ShopItems",
                newName: "ShopItem");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItems_ShopId",
                table: "ShopItem",
                newName: "IX_ShopItem_ShopId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItems_ItemId",
                table: "ShopItem",
                newName: "IX_ShopItem_ItemId");

            migrationBuilder.RenameIndex(
                name: "IX_ShopItems_CartId",
                table: "ShopItem",
                newName: "IX_ShopItem_CartId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ShopItem",
                table: "ShopItem",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItem_Carts_CartId",
                table: "ShopItem",
                column: "CartId",
                principalTable: "Carts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItem_Items_ItemId",
                table: "ShopItem",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShopItem_Shops_ShopId",
                table: "ShopItem",
                column: "ShopId",
                principalTable: "Shops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
