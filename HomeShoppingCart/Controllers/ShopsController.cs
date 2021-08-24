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
    [Route("api/[controller]")]
    public class ShopsController:ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public ShopsController(ICartRepository cartRepository)
        {
            this._cartRepository = cartRepository;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Shop>>> GetShops()
        {
            var shops = await _cartRepository.GetShopsAsync();
            return Ok(shops);
        }
        [HttpGet("{Id}",Name ="GetShopById")]
        public async Task<ActionResult<Shop>> GetShops(int Id)
        {
            var shop = await _cartRepository.GetShopByIdAsync(Id);
            if (shop == null)
                return NotFound();
            return Ok(shop);
        }
        [HttpPost()]
        public async Task<ActionResult> CreateShop([FromBody] Shop shop)
        {
             _cartRepository.AddShop(shop);

            await _cartRepository.SaveRepositroyAsync();
            return CreatedAtRoute("GetShopById", new { Id = shop.Id }, shop);
        }
    }
}
