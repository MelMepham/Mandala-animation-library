import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MandalaTwoComponent } from './mandala-two.component';
import { MandalaTwoRoutingModule } from './mandala-two-routing.module';



@NgModule({
  declarations: [
      MandalaTwoComponent
  ],
  imports: [
      CommonModule,
      MandalaTwoRoutingModule
  ],
  exports: [
      MandalaTwoComponent
  ]
})
export class MandalaTwoModule { }
