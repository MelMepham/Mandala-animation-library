import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import * as sketch from 'p5';
import { takeUntil } from 'rxjs/operators';

import { ColorsEnum } from '../styles/colors.enum';
import { AnimationService } from 'src/services/animation.service';
import { Subject } from 'rxjs';


@Component({
  templateUrl: './mandala-one.component.html',
  styleUrls: ['./mandala-one.component.scss']
})
export class MandalaOneComponent implements OnInit, OnDestroy {

  private sketch: any;
  private p: any;
  private s: any;
  private h: any;

  private destroyed$ = new Subject<void>();
  constructor(
      private animationService: AnimationService
  ) {
  }

  public isAnimated: boolean;

  public primaryColor = 'green';
  public secondaryColor = 'blue';
  public highlightColor = 'pink';

  public changeColors(color: string) {
      this.primaryColor = color;
      this.secondaryColor = color;
      this.highlightColor = color;

      this.getColors(ColorsEnum, this.primaryColor, this.secondaryColor, this.highlightColor);
      if (!this.animationService.isAnimated) {
          this.sketch.loop();
          this.sketch.noLoop();
      }
  }

  public revertColors() {
    this.primaryColor = 'green';
    this.secondaryColor = 'blue';
    this.highlightColor = 'pink';

    this.getColors(ColorsEnum, this.primaryColor, this.secondaryColor, this.highlightColor);
    if (!this.animationService.isAnimated) {
      this.sketch.loop();
      this.sketch.noLoop();
    }
  }

  public ngOnInit(): void {
    this.animationService.isAnimatedObservable$.pipe(
        takeUntil(this.destroyed$)
  )
      .subscribe(
        isAnimated => {
          this.isAnimated = isAnimated;
          this.checkIsAnimated(isAnimated);
        }
    );
    this.getColors(ColorsEnum, this.primaryColor, this.secondaryColor, this.highlightColor);
    this.createCanvas();
  }

  public ngOnDestroy(): void {
    this.destroyCanvas();
    this.destroyed$.next();
  }

  private createCanvas(): void {
    this.sketch = new sketch(this.mandala);
    if (this.isAnimated) {
      return
    }
    this.checkIsAnimated(this.isAnimated);
  }

  private destroyCanvas(): void {
    this.sketch.noCanvas();
  }

  private checkIsAnimated(val: boolean) {
    if (this.sketch) {
      val ? this.sketch.loop() : this.sketch.noLoop();
    }
    return;
  }

  private getColors(obj: any, primary: any, secondary: any, highlight: any) {
    this.p = obj[primary][0];
    this.s = obj[secondary][0];
    this.h = obj[highlight][0];
  }

  public mandala = (p: any) => {

    const width = window.innerWidth;
    const height = window.innerHeight;

    let canvasSize = width > height ? height : width;
    canvasSize = canvasSize - 20;

    // mandala objects
    let petal: any;
    let flowerX1: any, flowerY1: any, flowerY2: any, flowerCircle: any;
    let Atrianglex1: any, Atriangley1: any, Atriangley2: any, Btriangley1: any;
    let Ctrianglex1: any, Ctriangley1: any, Ctriangley2: any;
    let AcircleSize: any, AcircleX: any;
    let BcircleX: any, BcircleSize: any;
    let CCircleWH: any, CCircleY: any, DCircleWH: any;
    let ECircleHW: any;
    let outerTripleCirclesBigX: any, outerTripleCirclesBigC: any, outerTripleCirlcesMidC: any, outerTripleCirclesMidSmlX: any, outerTripleCirclesSmlC: any;
    let bigCircleC: any;
    let trianglex1: any, triangley1: any, trianglex3: any;
    let waterDropletY2: any, waterDropletY1: any, waterDropletX2: any;
    let waterDropletCircleC: any,  waterDropletCircleY: any;
    let waterDropletLittleY2: any, waterDropletLittleY1: any, waterDropletLittleX2: any;
    let curve: any, curvePointX: any, curvePointY: any;
    let biggestCircle: any, nearlyBiggestCircle: any;
    let circleInCurvedTriangles: any, smallCurvedTriangleStartPoint: any, smallCurvedTrianglesmallestControlPoint: any, smallCurvedTriangleHeight: any, smallCurvedTriangleHighestHeight: any;

    // setup vars
    function calculateSizes() {

      petal = canvasSize / 16;
      Atrianglex1 = canvasSize / 33;
      Atriangley1 = canvasSize / 18;
      Atriangley2 = canvasSize / 9;
      Btriangley1 = canvasSize / 11;
      AcircleSize = canvasSize / 63;
      AcircleX = BcircleX = petal;
      BcircleSize = AcircleSize * 6;
      flowerX1 = canvasSize / 15.1;
      flowerY1 = canvasSize / 9;
      flowerY2 = canvasSize / 5.5;
      flowerCircle = canvasSize / 3.8;
      CCircleY = canvasSize / 10;
      CCircleWH = canvasSize / 20;
      DCircleWH = canvasSize / 15;
      ECircleHW = canvasSize / 2.8;

      Ctrianglex1 = Atrianglex1 * 2.8;
      Ctriangley1 = Atriangley1 * 2.8;
      Ctriangley2 = canvasSize / 4.5;
      outerTripleCirclesBigX = canvasSize / 4.9;
      outerTripleCirclesBigC = canvasSize / 25;
      outerTripleCirclesMidSmlX  = canvasSize / 5.6;
      outerTripleCirlcesMidC = canvasSize / 26;
      outerTripleCirclesSmlC = canvasSize / 40;
      bigCircleC = canvasSize / 3.5;

      trianglex1 = canvasSize / 3;
      triangley1 = canvasSize / 20;
      trianglex3 = canvasSize / 10;

      waterDropletY2 = canvasSize / 3;
      waterDropletY1 = canvasSize / 4;
      waterDropletX2 = canvasSize / 12;
      waterDropletCircleC = canvasSize / 120;
      waterDropletCircleY = canvasSize / 3.45;
      waterDropletLittleY2 = canvasSize / 4.5;
      waterDropletLittleY1 = canvasSize / 3.8;
      waterDropletLittleX2 = canvasSize / 29;

      curve = canvasSize / 5;
      curvePointX = canvasSize / 2.4;
      curvePointY = canvasSize / 8;
      biggestCircle = canvasSize / 2.25;
      nearlyBiggestCircle = canvasSize / 2.8;

      circleInCurvedTriangles = canvasSize / 40
      smallCurvedTriangleStartPoint = canvasSize / 20;
      smallCurvedTrianglesmallestControlPoint = canvasSize / 29;
      smallCurvedTriangleHeight = canvasSize / 2.8;
      smallCurvedTriangleHighestHeight = canvasSize / 2.26;
    }

    // setup
    p.setup = () => {
      p.createCanvas(canvasSize, canvasSize).parent('forest-mandala');
      p.angleMode(p.DEGREES);
      calculateSizes();
    };
    p.center = { x: 0, y: 0 };

    // lets actually draw something now.
    p.draw = () => {

      p.background(255, 255, 255);
      p.center.x = p.width / 2;
      p.center.y = p.height / 2;

      // Outer flower shape
      p.push();
      p.translate(p.center.x, p.center.y);
      p.fill(p.color(this.p['600']));
      p.stroke(p.color(this.p['600']));
      p.rotate(p.radians(p.frameCount * 60) / -3);
      for (let i = 0; i < 12; i++) {
        p.beginShape();
        p.curve(curve, curve, -curvePointY, -curvePointX, curvePointY, -curvePointX, -curve, curve);
        p.rotate(30);
        p.endShape();
      }
      p.pop();

      p.push();
      p.noStroke();
      p.fill(p.color(this.p["100"]));
      p.translate(p.center.x, p.center.y);
      p.scale((p.sin(p.frameCount / 5) * 1) + .2);
      p.rotate(p.radians(p.frameCount * 60) / 3);
      p.circle(0, 0, biggestCircle);
      p.pop();

      // Curved triangles
      p.push();
      p.translate(p.center.x, p.center.y);

      p.noStroke();
      for (let i = 0; i < 24; i++) {
        p.beginShape();
        p.fill(this.p["500"]);
        p.scale((p.sin(p.frameCount / 5) * 1) + .2);
        p.rotate(p.radians(p.frameCount * 60) / 3);
        p.vertex(-smallCurvedTriangleStartPoint, -smallCurvedTriangleHeight);
        p.bezierVertex(-smallCurvedTriangleStartPoint, -smallCurvedTriangleHeight, -smallCurvedTrianglesmallestControlPoint, -smallCurvedTriangleHeight, 0, -smallCurvedTriangleHighestHeight);
        p.bezierVertex(0, -smallCurvedTriangleHighestHeight, smallCurvedTrianglesmallestControlPoint, -smallCurvedTriangleHeight, smallCurvedTriangleStartPoint, -smallCurvedTriangleHeight);
        p.vertex(smallCurvedTriangleStartPoint, -smallCurvedTriangleHeight);
        p.endShape(p.CLOSE);
        p.rotate(15);
      }
      p.pop();

      // The circles in the triangles
      p.push();
      p.noStroke();
      p.translate(p.center.x, p.center.y);
      p.fill(this.h["100"]);
      p.scale((p.sin(p.frameCount) * 1) + .5);
      p.rotate(p.radians(p.frameCount * 40));
      for (let i = 0; i < 24; i++) {
        p.circle(0, -smallCurvedTriangleHeight, circleInCurvedTriangles);
        p.rotate(15);
      }
      p.pop();

      // big blue circle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(p.color(this.s["500"]));
      p.scale((p.sin(p.frameCount) * 1) + .2);
      p.circle(0, 0, nearlyBiggestCircle);
      p.pop();

      // big blue circle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(p.color(this.s["300"]));
      p.scale((p.sin(p.frameCount) * 1) + .2);
      p.circle(0, 0, bigCircleC);
      p.pop();

      // long skinny lots of  triangles
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.h["200"]);
      p.rotate(p.radians(p.frameCount * 30));
      p.scale((p.sin(p.frameCount / 2) * 1.6) + .2);
      for (let i = 0; i < 12; i++) {
        p.triangle(-trianglex1, triangley1, -trianglex1, -triangley1, -trianglex3, 0);
        p.rotate(30);
      }
      // water droplets
      p.noStroke();
      p.beginShape();
      for (let i = 0; i < 12; i++) {
        p.fill(this.s["600"]);
        p.bezier(0, -waterDropletY1, -waterDropletX2, -waterDropletY2, waterDropletX2, -waterDropletY2, 0, -waterDropletY1);
        p.fill(this.s["200"]);
        p.circle(0, -waterDropletCircleY, waterDropletCircleC);
        p.rotate(30);
      };
      p.endShape();
      p.pop();

      p.push();
      p.translate(p.center.x, p.center.y);
      p.fill(this.p["200"]);
      p.noStroke();
      p.push();
      p.scale((p.sin(p.frameCount / 5) * 1.6) + .2);
      p.beginShape();
      p.rotate(p.radians(p.frameCount * -40));
      for (let i = 0; i < 6; i++) {
        p.rotate(60);
        p.bezier(0, -waterDropletLittleY2, -waterDropletLittleX2, -waterDropletLittleY1, waterDropletLittleX2, -waterDropletLittleY1, 0, -waterDropletLittleY2);
      };
      p.endShape();
      p.pop();

      p.push();
      p.beginShape();
      p.rotate(p.radians(p.frameCount * 40));
      for (let i = 0; i < 6; i++) {
        p.rotate(60);
        p.bezier(0, -waterDropletLittleY2, -waterDropletLittleX2, -waterDropletLittleY1, waterDropletLittleX2, -waterDropletLittleY1, 0, -waterDropletLittleY2);
      };
      p.endShape();
      p.pop();
      p.pop();

      // outer triple circles
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.rotate(p.radians(p.frameCount * -20));
      for (let i = 0; i < 12; i++) {
        p.fill(this.p["500"]);
        p.circle(outerTripleCirclesBigX, 0, outerTripleCirclesBigC);
        p.fill(this.p["300"]);
        p.circle(outerTripleCirclesMidSmlX, 0, outerTripleCirlcesMidC);
        p.fill(this.p["100"]);
        p.circle(outerTripleCirclesMidSmlX, 0, outerTripleCirclesSmlC);
        p.rotate(30);
      };
      p.pop();

      // Ctriangle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.p["400"]);
      p.rotate(p.radians(p.frameCount / 4) * 50);
      for (let i = 0; i < 6; i++) {
        p.triangle(Ctrianglex1, -Ctriangley1, -Ctrianglex1, -Ctriangley1, 0, -Ctriangley2)
        p.rotate(60);
      }
      p.pop();

      // flowerA
      p.push();
      p.translate(p.center.x, p.center.y);
      p.fill(p.color(this.s["700"]));
      p.push();
      p.noStroke();
      p.ellipse(0, 0, flowerCircle, flowerCircle);
      p.pop();
      p.push();
      p.scale((p.sin(p.frameCount / 2) * 1.6) + .2);
      p.rotate(p.radians(p.frameCount * -50));
      p.noStroke();
      for (let i = 0; i < 6; i++) {
        p.beginShape();
        p.vertex(-flowerX1, -flowerY1);
        p.bezierVertex(-flowerX1, -flowerY2, 0, -flowerY1, 0, -flowerY2);
        p.bezierVertex(0, -flowerY1, flowerX1, -flowerY2, flowerX1, -flowerY1);
        p.endShape();
        p.rotate(60);
      }
      p.pop();
      p.pop();

      // outer triple circles
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.scale((p.sin(p.frameCount / 2) * .5) + 1);
      p.rotate(p.radians(p.frameCount / 4) * -50);
      p.push();
      p.scale((p.sin(p.frameCount / 5) * 1.5) + 1);
      for (let i = 0; i < 12; i++) {
        p.fill(this.p["400"]);
        p.circle(outerTripleCirclesBigX, 0, outerTripleCirclesBigC / 4);
        p.rotate(30);
      };
      p.pop();
      p.push();
      for (let i = 0; i < 12; i++) {
        p.fill(this.p["500"]);
        p.circle(outerTripleCirclesMidSmlX, 0, outerTripleCirlcesMidC / 4);
        p.fill(this.p["300"]);
        p.circle(outerTripleCirclesMidSmlX, 0, outerTripleCirclesSmlC / 4);
        p.rotate(30);
      };
      p.pop();
      p.pop();

      // Ctriangle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.p["600"]);
      p.rotate(p.radians(p.frameCount / 4) * 50);
      for (let i = 0; i < 6; i++) {
        p.triangle(Ctrianglex1, -Ctriangley1, -Ctrianglex1, -Ctriangley1, 0, -Ctriangley2)
        p.rotate(60);
      }
      p.pop();

      // ECircle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(p.color(this.p["200"]));
      p.ellipse(0, 0, ECircleHW, ECircleHW);
      p.pop();

      // CCircle
      p.push();
      p.translate(p.center.x, p.center.y);
      p.scale((p.sin(p.frameCount / 2) * 1.3) + .2);
      for (let i = 0; i < 6; i++) {
        p.noStroke();
        p.fill(p.color(this.s["400"]));
        p.ellipse(0, -CCircleY, DCircleWH, DCircleWH);
        p.fill(p.color(this.s["300"]));
        p.ellipse(0, -CCircleY, CCircleWH, CCircleWH);
        p.rotate(60);
      }
      p.pop();

      // Bcircles
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.push();
      p.fill(this.p["500"]);
      p.scale(1.2);
      p.rotate(p.radians(p.frameCount * -50));
      for (let i = 0; i < 6; i++) {
        p.ellipse(-BcircleX, 0, BcircleSize, BcircleSize);
        p.rotate(60);
      }
      p.pop();
      p.push();
      p.rotate(p.radians(p.frameCount / 3) * 50);
      p.fill(this.p["200"]);
      for (let i = 0; i < 6; i++) {
        p.ellipse(-BcircleX, 0, BcircleSize, BcircleSize);
        p.rotate(60);
      }
      p.pop();
      p.pop();

      // Atriange
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.s["200"]);
      p.rotate(p.radians(p.frameCount / 4) * 50);
      p.scale((p.sin(p.frameCount / 1) * 1.3) + .5);
      for (let i = 0; i < 6; i++) {
        p.triangle(Atrianglex1, -Atriangley1, -Atrianglex1, -Atriangley1, 0, -Atriangley2)
        p.rotate(60);
      }
      p.fill(this.s["400"]);
      for (let i = 0; i < 6; i++) {
        p.triangle(Atrianglex1, -Atriangley1, -Atrianglex1, -Atriangley1, 0, -Btriangley1)
        p.rotate(60);
      }
      p.pop();

      // Acircles
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.h["300"]);
      p.rotate(p.radians(p.frameCount / 1) * -50);
      p.scale((p.sin(p.frameCount / 2) * 1.3) + .5);
      for (let i = 0; i < 6; i++) {
        p.ellipse(-AcircleX, 0, AcircleSize, AcircleSize);
        p.rotate(60);
      }
      p.pop();

      // circle framing the flower of life
      p.push();
      p.translate(p.center.x, p.center.y);
      p.noStroke();
      p.fill(this.p["200"]);
      p.scale((p.sin(p.frameCount / 3) * 1.3) + .5);
      p.ellipse(0, 0, petal * 2 , petal * 2);
      p.pop();

      // flower of life
      p.push();
      p.translate(p.center.x, p.center.y);
      p.strokeWeight(0.1);
      p.stroke(255, 255, 255, 0);
      p.fill(p.color(this.p["600"]));
      p.scale((p.sin(p.frameCount / 4) * .5) + .5);
      p.rotate(p.radians(p.frameCount / 4) * -50);
      for (let i = 0; i < 6; i++) {
        p.curve(petal, 0, 0, 0, 0, petal, petal, petal);
        p.curve(-petal, 0, 0, 0, 0, petal, -petal, petal);
        p.rotate(60);
      }
      p.rotate(p.radians(p.frameCount / 4) * -50);
      p.pop();

    };
  };
}
