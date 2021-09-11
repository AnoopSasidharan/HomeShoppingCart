using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Profiles
{
    public class ShopItemProfile: Profile
    {
        public ShopItemProfile()
        {
            CreateMap<ShopItemCreateDto, ShopItem>();
        }
    }
}
