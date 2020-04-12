import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: '/one', pathMatch: 'full'
    },
    {
        path: 'one',
        loadChildren: () => import('./mandala-lib/mandala-one/mandala-one.module').then(m => m.MandalaOneModule),
        data: { type: 'mandala' }
    },
    {
        path: 'two',
        loadChildren: () => import('./mandala-lib/mandala-two/mandala-two.module').then(m => m.MandalaTwoModule),
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
