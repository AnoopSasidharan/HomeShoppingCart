import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ICart } from '../Models/icart';
import { Shop } from '../Models/shop';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {
  _baseUrl: string;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    console.log(baseUrl);
  }
  resolve(): Observable<any> {
    return this.GetAllShops();
  }

  CreatNewCart(cart: ICart): Observable<any> {
    return this.http.post<ICart>(this._baseUrl + `api/cart`, cart);
  }
  GetAllShops(): Observable<any> {
    console.log('calling api');
    console.log(this._baseUrl + 'api/shops');
    return this.http.get(this._baseUrl + `api/shops`);
  }
  CreateNewShop(shop: Shop): Observable<any> {
    return this.http.post<Shop>(this._baseUrl + `api/shops`, shop);
  }
}
