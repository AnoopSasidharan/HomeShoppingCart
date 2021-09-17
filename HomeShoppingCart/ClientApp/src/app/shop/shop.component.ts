import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { ICart } from '../shared/Models/icart';
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

  currentCart: ICart;
  isEditorAddMode = false;
  selectedItemControl = new FormControl();
  filteredOptions: Observable<Item[]>;
  cartSubscription: Subscription;
  constructor(private dataservice: DataService, private cartService: CartService) { }

  ngOnInit(): void {
    this.filteredOptions = this.selectedItemControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.dataservice.allItemsStore.slice())
    );
    this.cartSubscription = this.cartService.currentCart.subscribe(c => this.currentCart = c);
  }

  addItem(): void {
    this.isEditorAddMode = true;
  }
  saveItem(): void {
    this.isEditorAddMode = false;
    var selectedItem = this.selectedItemControl.value;

    let shopItem: Shopitem = new Shopitem();

    let sItem = this.selectedItemControl.value as Item;
    
    if (!this.currentShop.shopItems) {
      this.currentShop.shopItems = [];
    }

    if (selectedItem["name"]) {
      let index = this.currentShop.shopItems.findIndex(i => i.itemId == selectedItem.id);
      if (index > -1) {
        this.selectedItemControl.setValue(``);
        this.onCancel();
        return;
      }
      shopItem.itemId = sItem.id;
      shopItem.isBagged = false;
      shopItem.itemName = sItem.name;
      shopItem.itemDescription = sItem.description;
      shopItem.shopName = this.currentShop.name;

      this.currentShop.shopItems.push(shopItem);
      
      this.selectedItemControl.setValue(``);
    } else {
      //add it to db
      
      let index = this.currentShop.shopItems.findIndex(i => i.itemName == selectedItem);
      if (index > -1) {
        this.selectedItemControl.setValue(``);
        this.onCancel();
        return;
      }

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

    if (!this.currentCart || !this.currentCart.id || this.currentCart.id<1) {
      this.cartService.createNewCart().subscribe(
        data => {
          unsavedItems.forEach(item => {
            item.cartId = this.currentCart.id;
            item.shopId = this.currentShop.id;
          });
          this.dataservice.CreateShopItems(unsavedItems).subscribe(
            items => {
              for (let i = 0; i < unsavedItems.length; i++) {
                unsavedItems[i].id = items[i].id;
                this.cartService.addItems(1);
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
        item.cartId = this.currentCart.id;
        item.shopId = this.currentShop.id
      })

      this.dataservice.CreateShopItems(unsavedItems).subscribe(
        items => {
          for (let i = 0; i < unsavedItems.length; i++) {
            unsavedItems[i].id = items[i].id;
            this.cartService.addItems(1);
          }
        },
        err => {
          console.error(err);
        }
      )
    }

  }
  onItemDelete($event): void {
    let tobeDeletedItem = $event as Shopitem;
    let item = this.currentShop.shopItems.findIndex(s => s == tobeDeletedItem);
    this.currentShop.shopItems.splice(item, 1);
    if (tobeDeletedItem.id) {
      this.cartService.deleteItems(1);
    }
  }
}
