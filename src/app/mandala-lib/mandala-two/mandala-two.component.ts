import { Component, OnDestroy, OnInit } from '@angular/core';
import { AnimationService } from '../../../services/animation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as sketch from 'p5';
import { ColorsEnum } from './colors.enum';

@Component({
    templateUrl: './mandala-two.component.html',
    styleUrls: ['./mandala-two.component.scss']
})
export class MandalaTwoComponent implements OnInit, OnDestroy {

    private sketch: any;
    private destroyed$ = new Subject<void>();

    private aqua;
    public aquaColour = 'aqua';

    constructor(
        private animationService: AnimationService
    ) {
    }

    public isAnimated: boolean;

    public ngOnInit(): void {
      this.animationService.isAnimatedObservable$.pipe(
          takeUntil(this.destroyed$)
      ).subscribe(
              isAnimated => {
                this.isAnimated = isAnimated;
                this.checkIsAnimated(isAnimated);
              }
          );
      this.createCanvas();
      this.getColors(ColorsEnum, this.aquaColour);
    }

    public ngOnDestroy(): void {
        this.sketch.noCanvas();
        this.destroyed$.next();
    }

    private createCanvas(): void {
        this.sketch = new sketch(this.mandalaTwo);
        if (this.isAnimated) {
            return;
        }
        this.checkIsAnimated(this.isAnimated);
    }

    private getColors(obj: any, aqua: any) {
        this.aqua = obj[aqua][0];
    }

    private checkIsAnimated(val: boolean) {
        if (this.sketch) {
            val ? this.sketch.loop() : this.sketch.noLoop();
        }
        return;
    }

    public mandalaTwo = (p: any) => {

      const width = window.innerWidth;
      const height = window.innerHeight;

      let canvasSize = width > height ? height : width;
      canvasSize = canvasSize - 20;

      let baseHex1: number, baseHex2: number;
      let circle: number;

      function calculateSizes() {
        baseHex1 = canvasSize / 5.25;
        baseHex2 = canvasSize / 9;
        circle = canvasSize / 8;
      }

      // setup
      p.setup = () => {
          p.createCanvas(canvasSize, canvasSize).parent('mandala-two');
          p.angleMode(p.DEGREES);
          calculateSizes();
      };
      p.center = { x: 0, y: 0 };

      p.draw = () => {

          p.background(45, 333, 213);
          p.center.x = p.width / 2;
          p.center.y = p.height / 2;

          p.push();
          p.noStroke();
          p.scale(0.4);
          p.translate(-30, -300);

              // This is the line
              for(let a = 0; a < 9; a++) {
                p.translate(p.center.x / -2.2, p.center.x / 1.2);
              p.push();
              for (let i = 0; i < 9; i++) {
                  // This is the shape

                  p.push();
                  p.fill('#EFFDSF');
                  p.scale((p.sin(p.frameCount) * 1) + 3.5);

                p.circle(0, 0, circle);

                  p.pop();
                for (let j = 0; j < 6; j++) {

                  p.push();
                  p.fill(this.aqua['300']);
                  p.triangle(-baseHex1 / 1.5, 0, -baseHex1, -baseHex2, -baseHex1, baseHex2);
                  p.pop();

                  p.push();
                          p.rotate(p.radians(p.frameCount * 60) / -3);
                          p.fill(this.aqua['400']);
                          p.triangle(0, 0, -baseHex1, -baseHex2, -baseHex1 / 1.5, 0);
                      p.pop();

                      p.push();
                          p.rotate(p.radians(p.frameCount * 60) / 3);
                          p.fill(this.aqua['200']);
                          p.triangle(0, 0, -baseHex1 / 1.5, 0, -baseHex1, baseHex2);
                      p.pop();
                      p.rotate(60);
                  }
                  p.translate(p.center.x / 1, 0);
              }
              p.pop();
              }

        p.pop();
      };
    }
}
