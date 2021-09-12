import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cart } from '../Models/cart';
import { ICart } from '../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userCart: Cart;
  userCarts: Cart[];
  test: ICart;
  _baseUrl: string;
  constructor(@Inject('BASE_URL') baseUrl: string, private http: HttpClient) {
    this._baseUrl = baseUrl;
  }
  createNewCart(): Observable<any> {
    let cart: Partial<ICart> = {
    };
    return this.http.post<ICart>(this._baseUrl + `api/cart`, cart)
      .pipe(
        map((val) => {
          let cart = val as ICart;
          if (cart) {
            if (!this.userCart) {
              this.userCart = new Cart();
            }
            this.userCart.CurrentCart = cart;
          }
            return val;
          })
        );
  }
}
