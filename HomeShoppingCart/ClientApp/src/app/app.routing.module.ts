import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const approutes: Routes = [
  
  
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
