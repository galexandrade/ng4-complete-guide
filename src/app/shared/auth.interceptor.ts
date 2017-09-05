import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import 'rxjs/add/operator/switchMap';
import { Injectable } from "@angular/core";
import * as fromApp from 'app/store/app.reducers';
import * as fromAuth from 'app/auth/store/auth.reducers';
import { Store } from "@ngrx/store";

@Injectable()
export class AuthInteceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted', req);
        
        return this.store.select('auth')
            .take(1)
            .switchMap((authState: fromAuth.State) => {
                const copiedReq = req.clone({params: req.params.append('auth', authState.token)});
                return next.handle(copiedReq);
            });
        //return next.handle(copiedReq);
    }

}