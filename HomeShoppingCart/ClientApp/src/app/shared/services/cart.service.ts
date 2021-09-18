import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { ICart } from '../Models/icart';
import { Shop } from '../Models/shop';
import { BusyService } from './busy.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _baseUrl: string;
  private shops = new BehaviorSubject<Shop[]>(null);
  private cart = new BehaviorSubject<ICart>(null);
  private totalCartItems = new BehaviorSubject<number>(0);
  currentShops = this.shops.asObservable();
  currentCart = this.cart.asObservable();
  currenttotalCartItems = this.totalCartItems.asObservable();
  constructor(@Inject('BASE_URL') baseUrl: string, private http: HttpClient, private busyService: BusyService) {
    this._baseUrl = baseUrl;
  }
  changeShops(shops: Shop[]) {
    this.shops.next(shops);
  }
  changeCart(cart: ICart) {
    this.cart.next(cart);
  }
  addItems(count: number) {
    let val = this.totalCartItems.value;
    val = val + count;
    this.changeItems(val);
  }
  deleteItems(count: number) {
    let val = this.totalCartItems.value;
    val = val - count;
    this.changeItems(val);
  }
  changeItems(total: number) {
    this.totalCartItems.next(total);
  }

  createNewCart(): Observable<any> {
    let cart: Partial<ICart> = {
    };
    return this.http.post<ICart>(this._baseUrl + `api/cart`, cart)
      .pipe(
        map((val) => {
          let cart = val as ICart;
          this.changeCart(cart);
            return val;
          })
        );
  }
  getCarts(queryParams: any): Observable<any> {
    this.busyService.showBusy(``);
    let _params = new HttpParams();
    _params = _params.append('getLatestCartOnly', queryParams.getLatestCartOnly);

    return this.http.get(this._baseUrl + `api/cart`, { params: _params })
      .pipe(
        map(val => {
          let cart = val as ICart[];
          this.changeCart(cart[0]);
          this.busyService.hideBusy();
            return val;
        }),
        catchError(err => {
          console.error(`no response from server or error occured - ${err}`);
          this.busyService.hideBusy();
          return of([]);
        })
     );
  }

  patchCart(cartId: number, patchData: any): Observable<any> {
    return this.http.patch(this._baseUrl + `api/cart/${cartId}`, patchData);
  }
}
