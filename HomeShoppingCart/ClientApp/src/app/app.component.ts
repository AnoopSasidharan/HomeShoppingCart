import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from './shared/Models/icart';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [`app.component.css`]
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  currentCart: ICart;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.currentCart.subscribe(cart => this.currentCart = cart);
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
