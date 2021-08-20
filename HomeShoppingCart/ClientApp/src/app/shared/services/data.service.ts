import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }//, @Inject('BASE_URL') private baseUrl: string) { }

  CreatNewCart(cart: ICart): Observable<any> {
    return null;
    //return this.http.post<ICart>(this.baseUrl + `Cart`, cart);
  }
}
