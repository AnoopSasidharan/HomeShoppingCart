using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController: ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public CartController(ICartRepository cartRepository)
        {
            this._cartRepository = cartRepository;
        }

        [HttpGet("{Id}", Name ="GetCartById")]
        public  async Task<ActionResult<Cart>> GetCart(int Id)
        {
            var carts = await _cartRepository.GetCartsByIdAsync(Id);
            return Ok(carts);
        }
        

        [HttpPost()]
        public async Task<ActionResult> CreateCart([FromBody] Cart cart)
        {
            this._cartRepository.AddCart(cart);
            await _cartRepository.SaveRepositroyAsync();

            return CreatedAtRoute("GetCartById", new { Id = cart.Id }, cart);
        }
    }
}
