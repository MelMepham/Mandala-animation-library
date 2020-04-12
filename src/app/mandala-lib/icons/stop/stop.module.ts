import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StopComponent } from './stop.component';

@NgModule({
  declarations: [
      StopComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    StopComponent
  ]
})
export class StopModule { }
