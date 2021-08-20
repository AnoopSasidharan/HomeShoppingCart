using HomeShoppingCart.Data;
using HomeShoppingCart.Data.Entity;
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
        public async Task<IEnumerable<Cart>> GetCartsAsync()
        {
            return await this._cartDbContext.Carts.ToListAsync();
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
    }
}
