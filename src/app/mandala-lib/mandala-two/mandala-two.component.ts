import {Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { AnimationService } from '../../../services/animation.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import * as sketch from 'p5';
import { ColorsEnum } from './colors.enum';
import {DOCUMENT} from '@angular/common';

@Component({
    templateUrl: './mandala-two.component.html',
    styleUrls: ['./mandala-two.component.scss']
})
export class MandalaTwoComponent implements OnInit, OnDestroy {

    private sketch: any;
    private destroyed$ = new Subject<void>();
    private aqua;

    public speed = 60;
    public aquaColour = 'aqua';

    constructor(
        private animationService: AnimationService,
        @Inject(DOCUMENT) document
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

    public updateSlider() {
        this.speed = Number((document.getElementById('mandala_two_slider') as HTMLInputElement).value);
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
          p.cnv = p.createCanvas(canvasSize, canvasSize).parent('mandala-two');
          p.cnv.mouseClicked(changeColour);
          p.angleMode(p.DEGREES);
          calculateSizes();
      };
      p.center = { x: 0, y: 0 };
      const colorArray = ['#97F3FA', '#49E2EE', '#00B7D5', '#017DAB', '#005A87'];

      let colorToUse1 = colorArray[Math.floor(Math.random() * 5)];
      let colorToUse2 = colorArray[Math.floor(Math.random() * 5)];
      let colorToUse3 = colorArray[Math.floor(Math.random() * 5)];
      let colorToUse4 = colorArray[Math.floor(Math.random() * 5)];

      function changeColour() {
          colorToUse1 = colorArray[Math.floor(Math.random() * 5)];
          colorToUse2 = colorArray[Math.floor(Math.random() * 5)];
          colorToUse3 = colorArray[Math.floor(Math.random() * 5)];
          colorToUse4 = colorArray[Math.floor(Math.random() * 5)];
      };

      p.draw = () => {

          p.background(45, 333, 213);
          p.center.x = p.width / 2;
          p.center.y = p.height / 2;

          p.push();
          p.noStroke();
          p.scale(0.4);
          p.translate(-30, -300);
              // This is the line
              for (let a = 0; a < 9; a++) {
                  p.translate(p.center.x / -2.2, p.center.x / 1.2);
                  p.push();
                    // This is the shape
                  for (let i = 0; i < 9; i++) {
                      p.push();
                      p.fill(colorToUse4);
                      p.scale((p.sin(p.frameCount) * 2) + this.speed / 130);
                      p.circle(0, 0, circle);
                      p.pop();
                      for (let j = 0; j < 6; j++) {
                          p.push();
                          p.fill(colorToUse3);
                          p.triangle(-baseHex1 / 1.5, 0, -baseHex1, -baseHex2, -baseHex1, baseHex2);
                          p.pop();
                          p.push();

                          p.rotate(p.radians(p.frameCount * this.speed) / -3);
                          p.fill(colorToUse1);
                          p.triangle(0, 0, -baseHex1, -baseHex2, -baseHex1 / 1.5, 0);
                          p.pop();

                          p.push();
                          p.rotate(p.radians(p.frameCount * this.speed) / 3);
                          p.fill(colorToUse2);
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
