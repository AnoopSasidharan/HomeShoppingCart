import { Component, Input, OnInit } from '@angular/core';
import { Shop } from '../shared/Models/shop';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() currentShop: Shop;
  constructor() { }

  ngOnInit(): void {
  }

}
