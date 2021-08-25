import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../shared/Models/item';
import { Shop } from '../shared/Models/shop';
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
  
  constructor(private dataService: DataService, private routeParams: ActivatedRoute) { }

  ngOnInit(): void {

    this.routeParams.data.subscribe(
      data => {
        this.availbaleShops = data.availShops;
        console.table(this.availbaleShops);
        console.table(data.availShops);
        for (let i = 0; i < this.availbaleShops.length; i++) {
          console.log(this.availbaleShops[i].name);
        }
      }
    );

    //let shop = new Shop();
    //shop.Name = "Costco";
    //shop.Id = 1;
    //this.availbaleShops.push(shop);
    
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
    var selectedShop = this.selectedShopControl.value;
    if (selectedShop["name"]) {
      this.shops.push(selectedShop);
      this.IsShopEditing = false;
    } else {
      //new shop that needs to be added to db
      let newShop = new Shop();
      newShop.name = selectedShop;
      this.dataService.CreateNewShop(newShop).subscribe(
        data => {
          let savedShop = data;
          this.availbaleShops.push(savedShop);
          this.shops.push(savedShop);
          this.IsShopEditing = false;
        });
    }
    
  }
  onCancel(): void {
    this.IsShopEditing = false;
  }
}

