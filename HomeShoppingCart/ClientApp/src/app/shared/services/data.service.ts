import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  _baseUrl: string;
  //constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
  //  this._baseUrl = baseUrl;
  //}
  constructor(private http: HttpClient) {
    //this._baseUrl = baseUrl;
  }

  CreatNewCart(cart: ICart): Observable<any> {
    return null;
    //return this.http.post<ICart>(this._baseUrl + `api\Cart`, cart);
  }
}
