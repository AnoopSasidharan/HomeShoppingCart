import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Cart } from '../Models/cart';
import { ICart } from '../Models/icart';
import { Shop } from '../Models/shop';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  userCart: Cart;
  userCarts: Cart[];
  //test: ICart;
  _baseUrl: string;
  private shops = new BehaviorSubject<Shop[]>(null);
  private cart = new BehaviorSubject<ICart>(null);
  currentShops = this.shops.asObservable();
  currentCart = this.cart.asObservable();
  constructor(@Inject('BASE_URL') baseUrl: string, private http: HttpClient) {
    this._baseUrl = baseUrl;
  }
  changeShops(shops: Shop[]) {
    this.shops.next(shops);
  }
  changeCart(cart: ICart) {
    this.cart.next(cart);
  }

  createNewCart(): Observable<any> {
    let cart: Partial<ICart> = {
    };
    return this.http.post<ICart>(this._baseUrl + `api/cart`, cart)
      .pipe(
        map((val) => {
          let cart = val as ICart;
          this.changeCart(cart);
          console.log(cart);
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
  getCarts(queryParams: any): Observable<any> {
    let _params = new HttpParams();
    _params = _params.append('getLatestCartOnly', queryParams.getLatestCartOnly);

    return this.http.get(this._baseUrl + `api/cart`, { params: _params })
      .pipe(
        map(val => {
          console.log(val as ICart[]);
          
          let cart = val as ICart[];
          console.log(`cart -${cart}`);
          this.changeCart(cart[0]);
            return val;
          })
        );
  }

  patchCart(cartId: number, patchData: any): Observable<any> {
    return this.http.patch(this._baseUrl + `api/cart/${cartId}`, patchData);
  }
}
