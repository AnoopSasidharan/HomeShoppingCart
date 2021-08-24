using HomeShoppingCart.Data.Entity;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeShoppingCart.Services
{
    public interface ICartRepository
    {
        void AddCart(Cart cart);
        Task<IEnumerable<Cart>> GetCartsAsync();
        Task<Cart> GetCartsByIdAsync(int Id);
        Task<bool> SaveRepositroyAsync();
        Task<IEnumerable<Shop>> GetShopsAsync();
        Task<Shop> GetShopByIdAsync(int shopId);
        void AddShop(Shop shop);
    }
}