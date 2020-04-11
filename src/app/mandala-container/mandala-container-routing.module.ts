import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MandalaOneComponent} from '../mandala-lib/mandala-one/mandala-one.component';


const routes: Routes = [
	{
		path: 'one',
		component: MandalaOneComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class MandalaContainerRoutingModule { }
