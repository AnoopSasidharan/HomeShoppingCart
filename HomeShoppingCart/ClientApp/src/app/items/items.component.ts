import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/Models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() currentItem: Item;
  constructor() { }

  ngOnInit(): void {
    if (!this.currentItem.quantity) {
      this.currentItem.quantity = 0;
    }
  }
  addQuantity(quanity: number): void {
    if (!this.currentItem.quantity) {
      this.currentItem.quantity = 0;
    }
    this.currentItem.quantity += quanity;
  }
}
