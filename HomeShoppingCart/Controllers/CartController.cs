using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;

        public CartController(ICartRepository cartRepository, IMapper mapper)
        {
            this._cartRepository = cartRepository;
            this._mapper = mapper;
        }


        [HttpGet()]
        public async Task<ActionResult<Cart>> GetCarts()
        {
            var carts = await _cartRepository.GetCartsAsync();
            return Ok(carts);
        }

        [HttpGet("{Id}", Name = "GetCartById")]
        public async Task<ActionResult<Cart>> GetCart(int Id)
        {
            var cart = await _cartRepository.GetCartsByIdAsync(Id);
            if (cart == null)
            {
                return NotFound($"No cart found for the id - {Id}");
            }
            return Ok(cart);
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
