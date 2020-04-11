import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandalaContainerComponent } from './mandala-container.component';
import { MandalaOneModule } from '../mandala-lib/mandala-one/mandala-one.module';
import { RouterModule } from '@angular/router';
import { MandalaContainerRoutingModule } from './mandala-container-routing.module';


@NgModule({
  declarations: [
      MandalaContainerComponent
  ],
  imports: [
      CommonModule,
      MandalaOneModule,
      RouterModule,
      MandalaContainerRoutingModule
  ],
  exports: [
      MandalaContainerComponent
  ]
})
export class MandalaContainerModule { }
