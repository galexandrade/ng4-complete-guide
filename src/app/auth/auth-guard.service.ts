import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/auth.reducers';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private store: Store<fromApp.AppState>){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.store.select('auth')
            .take(1)
            .map((authState: fromAuth.State) => authState.authenticated);
    }
}