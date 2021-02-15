import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ErrorsService } from 'src/app/services/errors.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorsService) {}

    /**
     * In case of a failed request retries once ( retry(1) )
     * and then in case of a second failure handles the error:
     *
     * - console logs error on every environment except production
     * - delagates error handling to a service
     * - returns an Observable (passes on the original error object with throwError)
     *   that can be subscribed to for component specific error handling beyond just
     *   outputting notification messages (i.e. 409 Email confilict user already exists,
     *   422 invalid form fields handling etc.)
     */

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (!environment.production) {
                    console.log(error);
                }

                this.errorService.handleError(error);

                return throwError(error);
            })
        );
    }
}
