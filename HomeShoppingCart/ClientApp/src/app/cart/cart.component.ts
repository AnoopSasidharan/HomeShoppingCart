import { Component, OnInit } from '@angular/core';
import { ICart } from '../shared/Models/icart';
import { Shop } from '../shared/Models/shop';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  shops: Shop[] = []; // temp;

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
   // this.shops = this.dataservice.currentCart.shops;
  }

 
}
