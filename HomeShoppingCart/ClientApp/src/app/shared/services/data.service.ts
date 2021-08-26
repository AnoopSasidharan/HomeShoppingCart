import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICart } from '../Models/icart';
import { Item } from '../Models/item';
import { Shop } from '../Models/shop';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {
  _baseUrl: string;
  allItemsStore: Item[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }
  resolve(): Observable<any> {
    this.GetAllItems().subscribe();
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
  GetAllItems(): Observable<any> {
    if (this.allItemsStore.length == 0) {
      return this.http.get(this._baseUrl + `api/itemcollection`).pipe(
        map(val => {
          this.allItemsStore = val as Item[];
          console.log(this.allItemsStore);
          return val;
        })
      )
    } else {
      return  of(this.allItemsStore);
    }
  }
}
