﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Data.Entity
{
    public class Shop
    {
        public int Id { get; set; }
        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
