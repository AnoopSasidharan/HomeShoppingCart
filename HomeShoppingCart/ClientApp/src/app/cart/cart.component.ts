import { Component, OnInit } from '@angular/core';
import { ICart } from '../shared/Models/icart';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit(): void {
  }

  createNewCart(): void {
    let cart: ICart = {
      Id:0,
      CreatedDate: new Date()
    }
    this.dataservice.CreatNewCart(cart).subscribe(
      data => console.log(data)
    );
  }
}
