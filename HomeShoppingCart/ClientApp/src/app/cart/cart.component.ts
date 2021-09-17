import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICart } from '../shared/Models/icart';
import { Shop } from '../shared/Models/shop';
import { CartService } from '../shared/services/cart.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shops: Shop[] = [];
  private CartId: number;
  
  constructor(private dataservice: DataService, private cartService: CartService, private route: Router) { }

  ngOnInit(): void {
    
    let shopitemsParams = {
      gGetLatestCartOnly: true
    }
    this.dataservice.getAllShopItems(shopitemsParams).subscribe(
      data => {
        if (data.length > 0) {
          this.CartId = data[0].cartId;
        }
        for (let i = 0; i < data.length; i++) {
          
          let shopName = data[i].shopName;
          var filter = this.shops.some(s => s.name === shopName);
          if (!filter) {
            let newShop = new Shop(data[i].shopId, shopName);
            newShop.mode = `cart`;
            this.shops.push(newShop);
          }
        }

        for (let i = 0; i < data.length; i++) {
          var shopId = data[i].shopId;
          var shop = this.shops.find(s => s.id === shopId);
          if (!shop)
            continue;
          if (!shop.shopItems) {
            shop.shopItems = [];
          }
          shop.shopItems.push(data[i]);
        }
      },
      err => {

      }
    )
  }

  updateItemStatus(item: any): void {
    let patchDocument = [{ "op": "replace", "path": "/IsBagged", "value": true }];
    this.dataservice.patchShopItem(item.id, patchDocument).subscribe(
      data => {
        item.isBagged = true;
      }
    )
  }

  editCart(): void {
    this.cartService.changeShops(this.shops);

    this.route.navigate([`/summary`]);
  }
  completeShopping(): void {
    let patchDocument = [{ "op": "replace", "path": "/IsCompleted", "value": true }];

    this.cartService.patchCart(this.CartId, patchDocument).subscribe
      (data => {

      }, err => {
      });
  }
}
