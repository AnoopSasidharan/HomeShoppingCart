import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { Item } from '../shared/Models/item';
import { Shop } from '../shared/Models/shop';
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
  constructor(private dataservice: DataService) { }

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
    this.isEditorAddMode = false;
    var selectedItem = this.selectedItemControl.value;
    console.log(selectedItem);
    if (selectedItem["name"]) {
      this.currentShop.items.push(selectedItem);
    } else {
      //add it to db
      let newItem = new Item();
      newItem.name = selectedItem;
      this.dataservice.CreateNewItem(newItem).subscribe(
        data => {
          this.currentShop.items.push(data);
          this.dataservice.allItemsStore.push(data);
        })
    }

  }
  onCancel(): void {

  }
  displayFn(item: Item): string {
    return item?.name ? item.name : '';
  }
  private _filter(name: string): Item[] {
    const filterValue = name.toLowerCase();

    return this.dataservice.allItemsStore.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  addToCart(): void {
    
  }
}
