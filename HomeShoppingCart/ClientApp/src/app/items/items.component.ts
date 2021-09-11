import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/Models/item';
import { Shopitem } from '../shared/Models/shopitem';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentItem: Shopitem;
  constructor() { }

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
}
