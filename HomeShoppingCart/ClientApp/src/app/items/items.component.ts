import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/Models/item';
import { Shopitem } from '../shared/Models/shopitem';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentItem: Shopitem;
  @Input() mode: string;
  @Output() deleted = new EventEmitter<Shopitem>();
  
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    if (!this.currentItem.quantity) {
      this.currentItem.quantity = 0;
    }
  }
  addQuantity(quanity: number): void {
    if (this.currentItem.quantity <= 0 && quanity<0) {
      return;
    }

    this.currentItem.quantity += quanity;
  }
  deleteItem(): void {
    if (this.currentItem.id && this.currentItem.id > 0) {
      this.dataService.deleteShopItem(this.currentItem.id).subscribe(
        data => {
          this.deleted.emit(this.currentItem);
        },
        err => {

        }
      );
    } else {
      this.deleted.emit(this.currentItem);
    }
  }
}
