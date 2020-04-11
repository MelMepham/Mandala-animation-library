import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AnimationService {

	public isAnimated = true;

	public isAnimatedObservable$ = new BehaviorSubject(this.isAnimated);

	public updateGlobalAnimationState():Observable<boolean> {
		this.isAnimated = !this.isAnimated;
		this.isAnimatedObservable$.next(this.isAnimated);
		return this.isAnimatedObservable$
	}
}
