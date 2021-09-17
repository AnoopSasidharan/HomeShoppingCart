import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of, forkJoin, from, EMPTY} from 'rxjs';
import { map } from 'rxjs/operators';
import { ICart } from '../Models/icart';
import { Item } from '../Models/item';
import { Shop } from '../Models/shop';
import { Shopitem } from '../Models/shopitem';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class DataService implements Resolve<any> {
  _baseUrl: string;
  allItemsStore: Item[] = [];
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string, private cartService: CartService) {
    this._baseUrl = baseUrl;
  }
  resolve(): Observable<any> {
    return forkJoin([
      this.GetAllShops(),
      this.cartService.getCarts({ getLatestCartOnly: true })
    ]);
  }
  

  CreatNewCart(cart: ICart): Observable<any> {
    return this.http.post<ICart>(this._baseUrl + `api/cart`, cart);
  }
  GetAllShops(): Observable<any> {
    return this.http.get(this._baseUrl + `api/shops`);
  }
  CreateNewShop(shop: Shop): Observable<any> {
    return this.http.post<Shop>(this._baseUrl + `api/shops`, shop);
  }
  LoadAllItems(): Observable<any>{
    if (this.allItemsStore.length == 0) {
      return this.http.get(this._baseUrl + `api/itemcollection`).pipe(
        map(val => {
          this.allItemsStore = val as Item[];
          return EMPTY;
        })
      )
    }
    return EMPTY;
  }
  GetAllItems(): Observable<any> {
    if (this.allItemsStore.length == 0) {
      return this.http.get(this._baseUrl + `api/itemcollection`).pipe(
        map(val => {
          this.allItemsStore = val as Item[];
          return val;
        })
      )
    } else {
      return  of(this.allItemsStore);
    }
  }
  CreateNewItem(item: Item): Observable<any> {
    return this.http.post<Shop>(this._baseUrl + `api/items`, item);
  }
  CreateShopItems(shopItems: Shopitem[]): Observable<any> {
    return this.http.post<Shopitem[]>(this._baseUrl + `api/shopitemscollections`, shopItems);
  }
  getShopItems(queryparams: any): Observable<any> {

    let _params = new HttpParams();
    _params = _params.append('ShopId', queryparams.shopId);
    _params = _params.append('CartId', queryparams.cartId);
    
    return this.http.get(this._baseUrl + `api/shopitems`, { params: _params });
  }
  getAllShopItems(queryparams: any): Observable<any> {

    let _params = new HttpParams();
    if (queryparams.shopId) {
      _params = _params.append('ShopId', queryparams.shopId);
    }
    if (queryparams.cartId) {
      _params = _params.append('CartId', queryparams.cartId);
    }
    if (queryparams.getLatestCartOnly) {
      _params = _params.append('GetLatestCartOnly', queryparams.getLatestCartOnly);
    }
    return this.http.get(this._baseUrl + `api/shopitemscollections`, { params: _params });
  }
  patchShopItem(shopId: number, patchData: any): Observable<any> {
    return this.http.patch(this._baseUrl + `api/shopitems/${shopId}`, patchData);
  }
  deleteShopItem(itemId: number): Observable<any> {
    return this.http.delete(this._baseUrl + `api/shopitems/${itemId}`);
  }
  
}
