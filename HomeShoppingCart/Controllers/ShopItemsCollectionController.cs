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

        //public async Task<ActionResult<IEnumerable<ShopItem>>> ShopItemsByIdsGet()
        //{

        //}
        [HttpPost()]
        public async Task<ActionResult> CreateShopItems([FromBody] IEnumerable<ShopItemCreateDto> shopItemCreateDtos)
        {
            var shopItems = _mapper.Map<IEnumerable<ShopItem>>(shopItemCreateDtos);
            foreach (var shopItem in shopItems)
            {
                shopItem.CreatedDate = DateTime.Now;
                _cartRepository.AddShopItem(shopItem);
            }
            await _cartRepository.SaveRepositroyAsync();
            return Ok();
        }
    }
}
