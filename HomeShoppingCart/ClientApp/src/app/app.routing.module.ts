import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';
import { ItemsComponent } from './items/items.component';


const approutes: Routes = [
  { path: 'cart', component: CartComponent },
  { path: 'items', component: ItemsComponent },
  { path: '', redirectTo: '/items', pathMatch:'full' }
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
