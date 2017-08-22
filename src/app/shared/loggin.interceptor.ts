import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/do';

@Injectable()
export class LogginInteceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //after sending
        return next.handle(req).do(
            event => {
                console.log('Loggin interceptor', event);
            }
        );
    }

}