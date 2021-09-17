using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Models
{
    public class CartUpdateDto
    {
        [Required]
        public bool IsCompleted { get; set; }
    }
}
