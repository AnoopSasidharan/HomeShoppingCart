using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Models
{
    public class ShopItemCreateDto
    {
        //public int Id { get; set; }
        public int ShopId { get; set; }
        public int ItemId { get; set; }
        public int CartId { get; set; }
        //public DateTime CreatedDate { get; set; }
        public int Quantity { get; set; }
        public string Status { get; set; }
        public bool IsBagged { get; set; }
    }
}
