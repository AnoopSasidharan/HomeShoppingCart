using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeShoppingCart.Controllers
{
    [ApiController]
    [Route("api/shopitems")]
    public class ShopItemsController: ControllerBase
    {
        private readonly ICartRepository _cartRepository;
        private readonly IMapper _mapper;

        public ShopItemsController(ICartRepository cartRepository, IMapper mapper)
        {
            this._cartRepository = cartRepository;
            this._mapper = mapper;
        }
        [HttpGet()]
        public async Task<ActionResult<ICollection<ShopItem>>> GetShopItems()
        {
            var shopItems = await _cartRepository.GetShopItemsAsync();

            return Ok(shopItems);
        }
        [HttpGet("{Id}", Name = "GetShopItemById")]
        public async Task<ActionResult<ICollection<ShopItem>>> GetShopItemById(int Id)
        {
            var shopItems = await _cartRepository.GetShopItemsAsync();

            return Ok(shopItems);
        }
        [HttpPost()]
        public async Task<ActionResult> CreateShopItem([FromBody] ShopItemCreateDto shopItemCreateDto)
        {
            var shopItem = _mapper.Map<ShopItem>(shopItemCreateDto);
            shopItem.CreatedDate = DateTime.Now;
            _cartRepository.AddShopItem(shopItem);
            await _cartRepository.SaveRepositroyAsync();

            return CreatedAtRoute("GetShopItemById", new { Id = shopItem.Id }, shopItem);
        }

    }
}
