using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemsController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public ItemsController(ICartRepository cartRepository)
        {
            this._cartRepository = cartRepository;
        }
        

        [HttpGet("{Id}",Name ="GetItemById")]
        public async Task<ActionResult<Item>> GetItem(int Id)
        {
            var item = await _cartRepository.GetItemByIdAsync(Id);

            if(item==null)
            {
                return NotFound();
            }

            return Ok(item);
        }
        [HttpPost()]
        public async Task<ActionResult> CreateItem([FromBody] Item item)
        {
            _cartRepository.AddItem(item);
            await _cartRepository.SaveRepositroyAsync();

            return CreatedAtRoute("GetItemById", new { Id = item.Id }, item);
        }
    }
}
