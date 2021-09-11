using HomeShoppingCart.Data.Entity;
using Microsoft.EntityFrameworkCore;

namespace HomeShoppingCart.Data
{
    public class CartDbContext : DbContext
    {
        public CartDbContext()
        {

        }
        public CartDbContext(DbContextOptions<CartDbContext> options) : base(options)
        {

        }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<Shop> Shops { get; set; }
        public DbSet<ShopItem> ShopItems { get; set; }
    }
}
