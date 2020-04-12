import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaOneComponent } from './mandala-one.component';
import { StopModule } from '../icons/stop/stop.module';
import { CancelModule } from '../icons/cancel/cancel.module';



const routes: Routes = [
    {
        path: '',
        component: MandalaOneComponent
    }
];

@NgModule({
    imports: [
        StopModule,
        CancelModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class MandalaOneRoutingModule { }
