using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemCollectionController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;

        public ItemCollectionController(ICartRepository cartRepository)
        {
            this._cartRepository = cartRepository;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _cartRepository.GetItems();
            return Ok(items);
        }
    }
}
