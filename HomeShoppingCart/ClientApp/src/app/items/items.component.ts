import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
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

  quantities: number[];
  
  constructor(private dataService: DataService) {
    this.quantities = [];
    for (let i = 0; i <= 10; i++) {
      this.quantities.push(i);
    }
  }

  ngOnInit(): void {
    if (!this.currentItem.quantity) {
      this.currentItem.quantity = 1;
    }
  }
  deleteItem(): void {
    if (this.currentItem.id && this.currentItem.id > 0) {      
      this.dataService.deleteShopItem(this.currentItem.id).subscribe(
        data => {
          this.deleted.emit(this.currentItem);
        },
        err => {
          console.error(err);
        }
      );
    } else {
      this.deleted.emit(this.currentItem);
    }
  }
  completeItem(): void {
    let patchDocument = [{ "op": "replace", "path": "/IsBagged", "value": true }];

    this.dataService.patchShopItem(this.currentItem.id, patchDocument).subscribe
      (data => {
        this.currentItem.isBagged = true;
      },
      err => {
      });
  }
}
