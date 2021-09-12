import { Component, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:[`home.component.css`]
})
export class HomeComponent implements OnInit {
  constructor(public cartService: CartService) { }
  ngOnInit(): void {
    
  }
}
