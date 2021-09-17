import { OnDestroy, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from './shared/Models/icart';
import { BusyService } from './shared/services/busy.service';
import { CartService } from './shared/services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [`app.component.css`]
})
export class AppComponent implements OnInit, OnDestroy {
  cartsub: Subscription;
  itmTotalsub: Subscription;
  currentCart: ICart;
  currentItemsTotal: number =0;
  constructor(private cartService: CartService, public busyService: BusyService) { }

  ngOnInit(): void {
    this.cartsub = this.cartService.currentCart.subscribe(cart => this.currentCart = cart);
    this.itmTotalsub = this.cartService.currenttotalCartItems.subscribe(total => this.currentItemsTotal = total);
  }
  ngOnDestroy(): void {
    this.cartsub.unsubscribe();
    this.itmTotalsub.unsubscribe();
  }
}
