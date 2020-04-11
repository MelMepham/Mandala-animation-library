import { Component, OnInit } from '@angular/core';
import { AnimationService } from 'src/services/animation.service';
import { routes } from '../app-routing.module';
import { Route, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss']
})
export class OverlayMenuComponent implements OnInit {

  public isAnimated: boolean;
  
  public currentUrl: string;
  public nextUrl: string;
  public backUrl: string;

  public routes: Array<Route>

  constructor (
      private _animationService: AnimationService,
      private _router: Router
  ) {

  }
  public ngOnInit(): void {

    routes.shift();
    this.routes = routes;

    this.isAnimated = this._animationService.isAnimated;

    this._router.events.pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(route => this.setUpRouteButtons(route))
  }

  public changeAnimationStatus(): void {
    this.isAnimated = !this.isAnimated;
    this._animationService.updateGlobalAnimationState();
  }

  public setUpRouteButtons(route: NavigationEnd): void {
      this.currentUrl = route.url.replace('/', '');
      const index = this.routes.findIndex(el => el.path === this.currentUrl)
      this.nextUrl = null;
      this.backUrl = null;

      if(this.routes[index + 1]) {
          this.nextUrl = this.routes[(index + 1)].path;
      }
      if(this.routes[index - 1]) {
          this.backUrl = this.routes[(index - 1)].path;
      }
  }

  public clickForward() {
    this._router.navigateByUrl(this.nextUrl);
  }
  
  public clickBack() {
    this._router.navigateByUrl(this.backUrl);

  }

}
