using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Models
{
    public class ShopItemUpdateDto
    {
        [Required]
        public bool IsBagged { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
