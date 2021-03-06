using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeShoppingCart.Services
{
    public interface ICartRepository
    {
        void AddCart(Cart cart);
        Task<IEnumerable<Cart>> GetCartsAsync(CartQueryParams cartQueryParams);
        Task<Cart> GetCartsByIdAsync(int Id);
        Task<bool> SaveRepositroyAsync();
        Task<IEnumerable<Shop>> GetShopsAsync();
        Task<Shop> GetShopByIdAsync(int shopId);
        void AddShop(Shop shop);
        Task<IEnumerable<Item>> GetItemsAync();
        Task<Item> GetItemByIdAsync(int Id);
        void AddItem(Item item);
        Task<IEnumerable<ShopItem>> GetShopItemsAsync(ItemsQueryParameters itemsQueryParameters);
        Task<IEnumerable<ShopItem>> GetShopItemByIdsAsync(IEnumerable<int> ids);
        Task<ShopItem> GetShopItemByIdAsync(int id);
        void AddShopItem(ShopItem item);
        void RemoveShopItem(ShopItem item);
        Task<bool> IsNonCompletedItemsExists(int cartId);
        Task MarkItemsComplete(int CartId);
    }
}