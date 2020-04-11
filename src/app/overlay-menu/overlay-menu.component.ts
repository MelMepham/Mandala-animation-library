import { Component, OnInit, OnDestroy } from '@angular/core';
import { AnimationService } from 'src/services/animation.service';
import { routes } from '../app-routing.module';
import { Route, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import {Subject} from 'rxjs';


@Component({
  selector: 'app-overlay-menu',
  templateUrl: './overlay-menu.component.html',
  styleUrls: ['./overlay-menu.component.scss']
})
export class OverlayMenuComponent implements OnInit, OnDestroy {

	private destroyed$ = new Subject<any>();
    public isAnimated: boolean;

    public currentUrl: string;
    public nextUrl: string;
    public backUrl: string;

    public updatedRoutes: Array<Route>;

	constructor(
		private animationService: AnimationService,
		private router: Router
	) {

    }
    public ngOnInit(): void {
	    this.isAnimated = this.animationService.isAnimated;

	    this.router.events.pipe(
	        takeUntil(this.destroyed$),
	        filter((e): e is NavigationEnd => e instanceof NavigationEnd)
	    ).subscribe(route => this.updateRouteButtons(route));
    }

    public ngOnDestroy(): void {
    	this.destroyed$.next();
    }

	public changeAnimationStatus(): void {
	    this.isAnimated = !this.isAnimated;
	    this.animationService.updateGlobalAnimationState();
    }

    public updateRouteButtons(route: NavigationEnd): void {
	    this.nextUrl = undefined;
	    this.backUrl = undefined;
        const fullRouteList = routes;
        this.currentUrl = route.url.replace('/', '');

	    this.updatedRoutes = fullRouteList.filter(currentRoute => currentRoute.data && currentRoute.data.type === 'mandala');
        const index = this.updatedRoutes.findIndex(el => el.path === this.currentUrl);

        if (this.updatedRoutes[index + 1]) {
            this.nextUrl = this.updatedRoutes[(index + 1)].path;
        }
        if (this.updatedRoutes[index - 1]) {
            this.backUrl = this.updatedRoutes[(index - 1)].path;
        }
    }

    public clickForward() {
	    this.router.navigateByUrl(this.nextUrl);
    }

    public clickBack() {
	    this.router.navigateByUrl(this.backUrl);
    }

}
