import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaOneComponent } from './mandala-lib/mandala-one/mandala-one.component';


export const routes: Routes = [
    {
        path: '', redirectTo: '/one', pathMatch: 'full'
    },
    {
        path: 'one',
        component: MandalaOneComponent,
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
