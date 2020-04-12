import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaOneComponent } from './mandala-lib/mandala-one/mandala-one.component';
import {MandalaOneModule} from './mandala-lib/mandala-one/mandala-one.module';


export const routes: Routes = [
    {
        path: '', redirectTo: '/one', pathMatch: 'full'
    },
    {
        path: 'one',
        loadChildren: () => import('./mandala-lib/mandala-one/mandala-one.module').then(m => m.MandalaOneModule),
        data: { type: 'mandala' }
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
