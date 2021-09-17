import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ICart } from '../shared/Models/icart';
import { Shop } from '../shared/Models/shop';
import { CartService } from '../shared/services/cart.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit, OnDestroy {
  shops: Shop[] = [];
  
  IsShopEditing = false;
  selectedShopControl = new FormControl();
  availbaleShops: Shop[] = [];
  subscription: Subscription;
  cartSubscription: Subscription;
  currentCart: ICart;

  constructor(private dataService: DataService, private routeParams: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.dataService.LoadAllItems().subscribe();
    this.routeParams.data.subscribe(
      data => {
        this.availbaleShops = data.initData[0];
        this.cartSubscription = this.cartService.currentCart.subscribe(c => this.currentCart = c);
      }
    );

    this.filteredOptions = this.selectedShopControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.availbaleShops.slice())
    );
    if (!this.shops) {
      this.shops = [];
    }
    this.subscription = this.cartService.currentShops.subscribe(message => this.shops = message);
    if (this.shops) {
      this.shops.forEach(shop => {
        shop.mode = `summary`;
      });
    } else {
      this.shops = [];
    }
  }
  addNewShop(): void {
    this.IsShopEditing = true;
  }
  filteredOptions: Observable<Shop[]>;

  displayFn(shop: Shop): string {
    return shop && shop.name ? shop.name : '';
  }
  private _filter(name: string): Shop[] {
    const filterValue = name.toLowerCase();

    return this.availbaleShops.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  AddShop(): void {
    var selectedShop = this.selectedShopControl.value;
    if (selectedShop["name"]) {
      let index = this.shops.findIndex(s => s.id === selectedShop.id);
      if (index > -1) {
        this.selectedShopControl.setValue(``);
        this.onCancel();
        return;
      }
      selectedShop.mode = `summary`;
      this.shops.push(selectedShop);
      this.IsShopEditing = false;
      this.selectedShopControl.setValue(``);
    } else {
      let index = this.shops.findIndex(s => s.name === selectedShop);
      if (index > -1) {
        this.selectedShopControl.setValue(``);
        this.onCancel();
        return;
      }

      //new shop that needs to be added to db
      let newShop = new Shop(-1, selectedShop);
      this.dataService.CreateNewShop(newShop).subscribe(
        data => {
          let savedShop = data;
          this.availbaleShops.push(savedShop);
          savedShop.mode = `summary`;
          this.shops.push(savedShop);
          this.IsShopEditing = false;
          this.selectedShopControl.setValue(``);
        });
    }
    
  }
  onCancel(): void {
    this.IsShopEditing = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.cartSubscription.unsubscribe();
  }

}

