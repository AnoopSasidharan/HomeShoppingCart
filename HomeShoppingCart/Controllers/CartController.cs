using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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
        public async Task<ActionResult<Cart>> GetCarts([FromQuery] CartQueryParams cartQueryParams)
        {
            var carts = await _cartRepository.GetCartsAsync(cartQueryParams);   
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
            cart.CreatedDate = DateTime.Now;
            this._cartRepository.AddCart(cart);
            await _cartRepository.SaveRepositroyAsync();

            return CreatedAtRoute("GetCartById", new { Id = cart.Id }, cart);
        }
        [HttpPatch("{Id}")]
        public async Task<ActionResult> PatchCart(int Id, [FromBody] JsonPatchDocument<CartUpdateDto> jsonPatchDocument)
        {
            var cart = await _cartRepository.GetCartsByIdAsync(Id);
            if (cart == null)
            {
                return NotFound();
            }

            bool completed = true;
            if (!cart.IsCompleted)
            {
                completed = false;
            }

            var cartToUpdate = _mapper.Map<CartUpdateDto>(cart);
            jsonPatchDocument.ApplyTo(cartToUpdate, ModelState);

            _mapper.Map(cartToUpdate, cart);
            if (cart.IsCompleted && !completed)
            {
                cart.CompletedDate = DateTime.Now;
                if(await _cartRepository.IsNonCompletedItemsExists(Id))
                {
                    await _cartRepository.MarkItemsComplete(Id);
                }
            }

            await _cartRepository.SaveRepositroyAsync();

            return NoContent();
        }
    }
}
