import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MandalaTwoComponent } from './mandala-two.component';

const routes: Routes = [
    {
        path: '',
        component: MandalaTwoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MandalaTwoRoutingModule { }
