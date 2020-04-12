import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaOneComponent } from './mandala-one.component';



const routes: Routes = [
    {
        path: '',
        component: MandalaOneComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MandalaOneRoutingModule { }
