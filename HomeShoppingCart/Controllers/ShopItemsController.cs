using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Models;
using HomeShoppingCart.Services;
using Microsoft.AspNetCore.JsonPatch;
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
        public async Task<ActionResult<ICollection<ShopItemDto>>> GetShopItems([FromQuery] ItemsQueryParameters itemsQueryParameters)
        {
            var shopItems = await _cartRepository.GetShopItemsAsync(itemsQueryParameters);

            return Ok(_mapper.Map<IEnumerable<ShopItemDto>>(shopItems));
        }
        [HttpGet("{Id}", Name = "GetShopItemById")]
        public async Task<ActionResult<ICollection<ShopItem>>> GetShopItemByIds(int Id)
        {
            var shopItem = await _cartRepository.GetShopItemByIdAsync(Id);
            if(shopItem==null)
            {
                return NotFound();
            }

            return Ok(shopItem);
        }
        [HttpPost()]
        public async Task<ActionResult> CreateShopItem([FromBody]  ShopItemCreateDto shopItemCreateDto)
        {
            var shopItem = _mapper.Map<ShopItem>(shopItemCreateDto);
            shopItem.CreatedDate = DateTime.Now;
            _cartRepository.AddShopItem(shopItem);
            await _cartRepository.SaveRepositroyAsync();

            return CreatedAtRoute("GetShopItemById", new { Id = shopItem.Id }, shopItem);
        }
        [HttpPatch("{Id}")]
        public async Task<ActionResult> PatchShopItem(int Id, [FromBody] JsonPatchDocument<ShopItemUpdateDto> shopItemUpdateDto)
        {
            var shopItem = await _cartRepository.GetShopItemByIdAsync(Id);
            if(shopItem==null)
            {
                return NotFound();
            }

            bool completed = true;
            if(!shopItem.IsBagged)
            {
                completed = false;
            }

            var shopItemToUpdate = _mapper.Map<ShopItemUpdateDto>(shopItem);
            shopItemUpdateDto.ApplyTo(shopItemToUpdate, ModelState );

            //shopItem =_mapper.Map<ShopItem>(shopItemToUpdate);
            _mapper.Map(shopItemToUpdate, shopItem);
            if (shopItem.IsBagged && !completed)
            {
                shopItem.CompleteDate = DateTime.Now;
            }


            await _cartRepository.SaveRepositroyAsync();

            return NoContent();
        }

    }
}
