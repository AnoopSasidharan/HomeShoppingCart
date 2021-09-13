using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Data.Entity
{
    public class ShopItem
    {
        public int Id { get; set; }
        public Shop Shop { get; set; }
        public int ShopId { get; set; }
        public Item Item { get; set; }
        public int ItemId { get; set; }
        public Cart Cart { get; set; }
        public int CartId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
        public bool IsBagged { get; set; }
        public DateTime CompleteDate { get; set; }
    }
}
