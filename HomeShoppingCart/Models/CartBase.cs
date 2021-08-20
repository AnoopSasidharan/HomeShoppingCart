using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Models
{
    public abstract class CartBase
    {
        public DateTime CreatedDate { get; set; }
        public DateTime? CompletedDate { get; set; }
    }
}
