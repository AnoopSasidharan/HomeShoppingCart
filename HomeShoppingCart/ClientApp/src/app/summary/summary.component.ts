import { Component, OnInit } from '@angular/core';
import { Item } from '../shared/Models/item';
import { Shop } from '../shared/Models/shop';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent implements OnInit {
  shops: Shop[] = [];
  IsShopEditing = false;
  constructor() { }

  ngOnInit(): void {
    //let shop1 = new Shop();
    //shop1.Name = "Walmart";
    //let item1 = new Item();
    //item1.Name = "Orange";
    //shop1.Items.push(item1);
    //let item2 = new Item();
    //item2.Name = "Apple";
    //shop1.Items.push(item2);
    //let item3 = new Item();
    //item3.Name = "Peach";
    //shop1.Items.push(item3);
    //let shop2 = new Shop();
    //shop2.Name = "Giant Eagle";
    //let shop3 = new Shop();
    //shop3.Name = "Indian Store";

    //this.shops.push(shop1);
    //this.shops.push(shop2);
    //this.shops.push(shop3);
  }
  addNewShop(): void {
    this.IsShopEditing = true;
    let newshop = new Shop();
    newshop.IsEditMode = true;
    //newshop.Name = `Test ${new Date()}`;
    this.shops.push(newshop);
  }
}
