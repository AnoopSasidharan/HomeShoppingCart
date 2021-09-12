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
        //public async Task<ActionResult<IEnumerable<ShopItem>>> ShopItemsGet()
        //{

        //}

        [HttpGet("({ids})", Name = "ShopItemsByIdsGet")]
        public  ActionResult ShopItemsByIdsGet([FromRoute][ModelBinder(BinderType = typeof(ArrayModelBinder))] IEnumerable<int> ids)
        {
            var ret = new int[]
            {
                1,
                2
            };
            return Ok(ret);
        }
        [HttpPost()]
        public async Task<ActionResult> CreateShopItems([FromBody]  IEnumerable <ShopItemCreateDto> shopItemCreateDtos)
        {
            var shopItems = _mapper.Map<IEnumerable<ShopItem>>(shopItemCreateDtos);
            foreach (var shopItem in shopItems)
            {
                shopItem.CreatedDate = DateTime.Now;
                _cartRepository.AddShopItem(shopItem);
            }
            await _cartRepository.SaveRepositroyAsync();

            var Ids = shopItems.Select(s => s.Id);
            var IdsJoined = string.Join(",", Ids);

            return CreatedAtRoute("ShopItemsByIdsGet", new { ids = IdsJoined }, shopItems);
        }
    }
}
