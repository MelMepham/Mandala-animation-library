import { Component, OnInit } from '@angular/core';
import {AnimationService} from 'src/services/animation.service';

@Component({
  selector: 'overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss']
})
export class OverlayMenuComponent implements OnInit {

  public isAnimated: boolean;
  
  public hasMoreLeft: boolean;
  public hasMoreRight: boolean;

  constructor(
      private _animationService: AnimationService
  ) {

  }
  public ngOnInit(): void {
    this.isAnimated = this._animationService.isAnimated;
  }

  public changeAnimationStatus(): void {
    this.isAnimated = !this.isAnimated;
    this._animationService.updateGlobalAnimationState();
  }

}
