import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayMenuComponent } from './overlay-menu.component';
import { ArrowLeftModule } from './icons/arrow-left/arrow-left.module';
import { ArrowRightModule } from './icons/arrow-right/arrow-right.module';
import { PauseModule } from './icons/pause/pause.module';
import { PlayModule } from './icons/play/play.module';



@NgModule({
  declarations: [
      OverlayMenuComponent,
  ],
    imports: [
        CommonModule,
        ArrowLeftModule,
        ArrowRightModule,
        PauseModule,
        PlayModule
    ],
  exports: [
      OverlayMenuComponent
  ]
})
export class OverlayMenuModule { }
