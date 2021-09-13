import { Component, OnInit } from '@angular/core';
import { ICart } from '../shared/Models/icart';
import { Shop } from '../shared/Models/shop';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shops: Shop[] = []; // temp;
  mySet = new Set();
  cartElems: any[] = [];

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
    
    let shopitemsParams = {
      gGetLatestCartOnly: true
    }
    this.dataservice.getAllShopItems(shopitemsParams).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          this.mySet.add(data[i].shopName);
        }
        this.mySet.forEach(val => {
          this.cartElems.push({
            shop: val,
            items: []
          });
        });

        for (let i = 0; i < data.length; i++) {
          var shop = this.cartElems.find(s => s.shop === data[0].shopName);
          if (shop) {
            shop.items.push(data[i]);
          }
        }
        console.log(this.cartElems);
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
}
