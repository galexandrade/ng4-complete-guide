import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import { AuthService } from "app/auth/auth.service";

@Injectable()
export class AuthInteceptor implements HttpInterceptor {
    constructor(private authService: AuthService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted', req);
        const copiedReq = req.clone({
            //headers: req.headers.append('', '')
            params: req.params.append('auth', this.authService.getToken())
        });
        return next.handle(copiedReq);
    }

}