using AutoMapper;
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
        private readonly IMapper _mapper;

        public ItemCollectionController(ICartRepository cartRepository, IMapper mapper)
        {
            this._cartRepository = cartRepository;
            this._mapper = mapper;
        }
        [HttpGet()]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _cartRepository.GetItemsAync();
            return Ok(items);
        }
    }
}
