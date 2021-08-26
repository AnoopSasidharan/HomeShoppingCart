using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Data.Entity
{
    public class ShopItem
    {
        public int Id { get; set; }
        //public string Name { get; set; }
        //public string Description { get; set; }
        public Shop Shop { get; set; }
        public int ShopId { get; set; }
        public Item Item { get; set; }
        public int ItemId { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
