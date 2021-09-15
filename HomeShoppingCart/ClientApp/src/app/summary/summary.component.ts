import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Cart } from '../shared/Models/cart';
import { Shop } from '../shared/Models/shop';
import { CartService } from '../shared/services/cart.service';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  shops: Shop[] = [];
  

  IsShopEditing = false;
  selectedShopControl = new FormControl();
  availbaleShops: Shop[] = [];

  constructor(private dataService: DataService, private routeParams: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {

    this.routeParams.data.subscribe(
      data => {
        this.availbaleShops = data.initData[0];
        let currentCart = data.initData[1];
        console.log(data.initData[1]);
        if (!currentCart || currentCart.length == 0)
          return;

        if (!this.cartService.userCart) {
          this.cartService.userCart = new Cart();
        }
        this.cartService.userCart.CurrentCart = currentCart;
      }
    );

    this.filteredOptions = this.selectedShopControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.availbaleShops.slice())
      );
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
    this.dataService.LoadAllItems().subscribe();
    var selectedShop = this.selectedShopControl.value;
    if (selectedShop["name"]) {
      console.log(selectedShop);
      let index = this.shops.findIndex(s => s.id === selectedShop.id);
      if (index > -1) {
        console.log(`added already`);
        this.selectedShopControl.setValue(``);
        this.onCancel();
        return;
      }
        
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
          this.shops.push(savedShop);
          this.IsShopEditing = false;
          this.selectedShopControl.setValue(``);
        });
    }
    
  }
  onCancel(): void {
    this.IsShopEditing = false;
  }
}

