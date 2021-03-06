using HomeShoppingCart.Data;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Services
{
    public class CartRepository : ICartRepository
    {
        private readonly CartDbContext _cartDbContext;

        public CartRepository(CartDbContext cartDbContext)
        {
            this._cartDbContext = cartDbContext;
        }
        public async Task<IEnumerable<Cart>> GetCartsAsync(CartQueryParams cartQueryParams)
        {
            var carts  = _cartDbContext.Carts as IQueryable<Cart>;
            if (cartQueryParams.GetLatestCartOnly)
            {
                var cart = _cartDbContext.Carts.Where(c => c.CompletedDate == null).OrderByDescending(c => c.CreatedDate);
                var topCart = cart.FirstOrDefault();
                if(topCart ==null)
                {
                    carts = carts.Where(c => 1 == 0);
                }
                else
                {
                    carts = carts.Where(c => c.Id == topCart.Id);
                }
            }

            return await carts.ToListAsync();
        }
        public async Task<Cart> GetCartsByIdAsync(int Id)
        {
            return await this._cartDbContext.Carts.FindAsync(Id);
        }
        public void AddCart(Cart cart)
        {
            this._cartDbContext.Carts.Add(cart);
        }
        public async Task<bool> SaveRepositroyAsync()
        {
            return await this._cartDbContext.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Shop>> GetShopsAsync()
        {
            return await _cartDbContext.Shops.ToListAsync();
        }

        public async Task<Shop> GetShopByIdAsync(int shopId)
        {
            return await _cartDbContext.Shops.FindAsync(shopId);
        }

        public void AddShop(Shop shop)
        {
            _cartDbContext.Shops.Add(shop);
        }
        public async Task<IEnumerable<Item>> GetItemsAync()
        {
            return await _cartDbContext.Items.ToListAsync();
        }
        public async Task<Item> GetItemByIdAsync(int Id)
        {
            return await _cartDbContext.Items.FindAsync(Id);
        }
        public void AddItem(Item item)
        {
            _cartDbContext.Items.Add(item);
        }
        public async Task<IEnumerable<ShopItem>> GetShopItemsAsync(ItemsQueryParameters itemsQueryParameters)
        {
            var shopItems = _cartDbContext.ShopItems as IQueryable<ShopItem>;
            if(itemsQueryParameters.GetLatestCartOnly)
            {
                var cart = _cartDbContext.Carts.Where(c => c.CompletedDate == null).OrderByDescending(c=>c.CreatedDate);
                var topCart = cart.FirstOrDefault();

                shopItems= shopItems.Include(s => s.Shop).Where(s => s.CartId == topCart.Id);
                shopItems = shopItems.Include(s => s.Item);
            }
            else
            {
                if (itemsQueryParameters.CartId.HasValue)
                {
                    shopItems = shopItems.Where(s => s.CartId == itemsQueryParameters.CartId);
                }
                if (itemsQueryParameters.ShopId.HasValue)
                {
                    shopItems = shopItems.Where(s => s.ShopId == itemsQueryParameters.ShopId);
                }
            }

            return await shopItems.ToListAsync();
        }
        public async Task<IEnumerable<ShopItem>> GetShopItemByIdsAsync(IEnumerable<int> ids)
        {
            return await _cartDbContext.ShopItems.Where(si => ids.Contains(si.Id)).ToListAsync();
        }
        public async Task<ShopItem> GetShopItemByIdAsync(int id)
        {
            return await _cartDbContext.ShopItems.FindAsync(id);
        }
        public void AddShopItem(ShopItem item)
        {
            _cartDbContext.ShopItems.Add(item);
        }
        public void RemoveShopItem(ShopItem item)
        {
            _cartDbContext.ShopItems.Remove(item);
        }
        public async Task<bool> IsNonCompletedItemsExists(int cartId)
        {
            return await _cartDbContext.ShopItems.AnyAsync(i => i.CartId == cartId && i.IsBagged == false);
        }
        public async Task MarkItemsComplete(int CartId)
        {
            var carts = _cartDbContext.ShopItems.Where(s => s.CartId == CartId && s.IsBagged == false);
            await carts.ForEachAsync(item =>
            {
                item.IsBagged = true;
                item.CompleteDate = DateTime.Now;
            });
            return;
        }
    }
}
