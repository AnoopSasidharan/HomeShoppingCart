import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartComponent } from './cart/cart.component';

import { DataService } from './shared/Services/data.service';

const approutes: Routes = [
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: '',
    redirectTo: '/cart',
    pathMatch:'full'
  }
  
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
