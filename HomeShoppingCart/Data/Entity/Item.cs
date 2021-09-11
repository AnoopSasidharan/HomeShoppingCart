using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Data.Entity
{
    public class Item
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int AccessCount { get; set; }
    }
}
