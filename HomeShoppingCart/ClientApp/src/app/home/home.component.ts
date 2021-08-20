import { Component, OnInit } from '@angular/core';
import { ICart } from '../shared/Models/icart';
import { DataService } from '../shared/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls:[`home.component.css`]
})
export class HomeComponent implements OnInit {
  constructor(private dataservice: DataService) { }
  CreateNewCart(): void {
    let cart: ICart = {
      Id: 0,
      CreatedDate: new Date()
    };
    this.dataservice.CreatNewCart(cart).subscribe(data => {
      console.log(data);
    })
  }

  ngOnInit(): void {
    
  }
}
