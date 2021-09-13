using AutoMapper;
using HomeShoppingCart.Data.Entity;
using HomeShoppingCart.Helpers;

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
    [Route("api/shopitemscollections")]
    public class ShopItemsCollectionController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICartRepository _cartRepository;

        public ShopItemsCollectionController(IMapper mapper, ICartRepository cartRepository)
        {
            this._mapper = mapper;
            this._cartRepository = cartRepository;
        }
        public async Task<ActionResult<ICollection<ShopItemDto>>> ShopItemsGet([FromQuery] ItemsQueryParameters itemsQueryParameters)
        {
            
            var shopItems = await _cartRepository.GetShopItemsAsync(itemsQueryParameters);

            return Ok(_mapper.Map<IEnumerable<ShopItemDto>>(shopItems));
        }

        [HttpGet("({ids})", Name = "ShopItemsByIdsGet")]
        public async Task<ActionResult<IEnumerable<ShopItemDto>>> ShopItemsByIdsGet([FromRoute][ModelBinder(BinderType = typeof(ArrayModelBinder))] IEnumerable<int> ids)
        {
            var shopItems = await _cartRepository.GetShopItemByIdsAsync(ids);
            return Ok(_mapper.Map<IEnumerable<ShopItemDto>>(shopItems));
        }
        [HttpPost()]
        public async Task<ActionResult> CreateShopItems([FromBody]  IEnumerable <ShopItemCreateDto> shopItemCreateDtos)
        {
            var shopItems = _mapper.Map<IEnumerable<ShopItem>>(shopItemCreateDtos);
            foreach (var shopItem in shopItems)
            {
                shopItem.CreatedDate = DateTime.Now;
                //var item = await _cartRepository.GetItemByIdAsync(shopItem.ItemId);
                //var shop = await _cartRepository.GetShopByIdAsync(shopItem.ShopId);
                //shopItem.Shop = shop;
                //shopItem.Item = item;
                _cartRepository.AddShopItem(shopItem);
            }
            await _cartRepository.SaveRepositroyAsync();

            var Ids = shopItems.Select(s => s.Id);
            var IdsJoined = string.Join(",", Ids);

            return CreatedAtRoute("ShopItemsByIdsGet", new { ids = IdsJoined }, shopItems);
        }
    }
}
