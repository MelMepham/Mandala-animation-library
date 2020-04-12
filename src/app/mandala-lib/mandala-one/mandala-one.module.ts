import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandalaOneComponent } from './mandala-one.component';
import { StopModule } from '../icons/stop/stop.module';
import { CancelModule } from '../icons/cancel/cancel.module';
import { MandalaOneRoutingModule } from './mandala-one-routing.module';

@NgModule({
    declarations: [
        MandalaOneComponent
    ],
    imports: [
        CommonModule,
        StopModule,
        CancelModule,
        MandalaOneRoutingModule
    ],
    exports: [
        MandalaOneComponent
    ]
})
export class MandalaOneModule { }
