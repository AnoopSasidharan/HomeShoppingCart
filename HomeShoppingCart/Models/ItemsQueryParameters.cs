using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Models
{
    public class ItemsQueryParameters
    {
        public int? CartId { get; set; }
        public int? ShopId { get; set; }
        public bool GetLatestCartOnly { get; set; } = true;
    }
}
