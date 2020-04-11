import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaContainerComponent } from './mandala-container/mandala-container.component';
import { MandalaOneComponent } from './mandala-lib/mandala-one/mandala-one.component';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./mandala-container/mandala-container.module').then(m => m.MandalaContainerModule)
  }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes)
  ],
  exports: [
      RouterModule
  ]
})
export class AppRoutingModule { }
