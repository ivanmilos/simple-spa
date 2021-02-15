import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    apiUrl = environment.apiUrl;

    constructor() {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (req.url.indexOf('http') === -1) {
            // prepend base api url string
            const apiReq = req.clone({ url: `${this.apiUrl}${req.url}` });
            return next.handle(apiReq);
        } else {
            return next.handle(req);
        }
    }
}
