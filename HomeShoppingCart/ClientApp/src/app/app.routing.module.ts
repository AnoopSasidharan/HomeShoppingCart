import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './items/items.component';
import { DataService } from './shared/services/data.service';
import { ShopComponent } from './shop/shop.component';
import { SummaryComponent } from './summary/summary.component';



const approutes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'summary', component: SummaryComponent, resolve: { availShops: DataService }, },
  { path: 'items', component: ItemsComponent },
  { path: '', redirectTo: '/summary', pathMatch:'full' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(approutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
