import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../shared/Models/item';
import { Shop } from '../shared/Models/shop';
import { Shopitem } from '../shared/Models/shopitem';
import { CartService } from '../shared/services/cart.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() currentShop: Shop;

  isEditorAddMode = false;
  selectedItemControl = new FormControl();
  filteredOptions: Observable<Item[]>;
  constructor(private dataservice: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.filteredOptions = this.selectedItemControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.dataservice.allItemsStore.slice())
      );

  }

  addItem(): void {
    this.isEditorAddMode = true;
  }
  saveItem(): void {
    //console.log(`on save item`);
    this.isEditorAddMode = false;
    var selectedItem = this.selectedItemControl.value;

    //console.log(selectedItem);

    let shopItem: Shopitem = new Shopitem();

    let sItem = this.selectedItemControl.value as Item;
    
    if (!this.currentShop.shopItems) {
      this.currentShop.shopItems = [];
    }

    if (selectedItem["name"]) {
      shopItem.itemId = sItem.id;
      shopItem.isBagged = false;
      shopItem.itemName = sItem.name;
      shopItem.itemDescription = sItem.description;

      this.currentShop.shopItems.push(shopItem);
      
      this.selectedItemControl.setValue(``);
    } else {
      //add it to db
      let newItem = new Item();
      newItem.name = selectedItem;
      this.dataservice.CreateNewItem(newItem).subscribe(
        data => {
          shopItem.itemId = data.id;
          shopItem.isBagged = false;
          shopItem.itemName = data.name;
          shopItem.itemDescription = data.description;

          this.currentShop.shopItems.push(shopItem);
          this.dataservice.allItemsStore.push(data);
          this.selectedItemControl.setValue(``);
        })
    }

  }
  onCancel(): void {
    this.isEditorAddMode = false;

  }
  displayFn(item: Item): string {
    return item?.name ? item.name : '';
  }
  private _filter(name: string): Item[] {
    const filterValue = name.toLowerCase();

    return this.dataservice.allItemsStore.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  addToCart(): void {
    var unsavedItems = this.currentShop.shopItems.filter(i => (!i.id) || (i.id < 1));

    if (!this.cartService.userCart) {
      this.cartService.createNewCart().subscribe(
        data => {
          console.log(data);
          unsavedItems.forEach(item => {
            item.cartId = this.cartService.userCart.CurrentCart.id;
            item.shopId = this.currentShop.id;
            item.cartId = this.cartService.userCart.CurrentCart.id
          });
          this.dataservice.CreateShopItems(unsavedItems).subscribe(
            items => {
              // console.log(`items saved`);
              // console.log(items);
              // this.updateSavedItems(this.cartService.userCart.CurrentCart.id, this.currentShop.id);
              for (let i = 0; i < unsavedItems.length; i++) {
                unsavedItems[i].id = items[i].id;
              }
            },
            err => {
              console.error(err);
            }
          )
        },
        err => {

        }
      )
    } else {
      unsavedItems.forEach(item => {
        item.cartId = this.cartService.userCart.CurrentCart.id;
        item.shopId = this.currentShop.id
      })

      this.dataservice.CreateShopItems(unsavedItems).subscribe(
        items => {
          // console.log(items);
          // this.updateSavedItems(this.cartService.userCart.CurrentCart.id, this.currentShop.id);
          for (let i = 0; i < unsavedItems.length; i++) {
            unsavedItems[i].id = items[i].id;
          }
          // this.updateSavedItems(this.cartService.userCart.CurrentCart.id, this.currentShop.id);
        },
        err => {
          console.error(err);
        }
      )
    }

  }
  private updateSavedItems(cartId: number, shopId: number): void {
    let quryParams = {
      shopId: shopId,
      cartId: cartId
    };
    this.dataservice.getShopItems(quryParams).subscribe(
      data => {
        console.log(data);
      }
    )
  }
}
