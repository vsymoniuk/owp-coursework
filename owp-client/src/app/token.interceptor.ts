import { AuthService } from "./services/auth.service";
import { Injectable, ErrorHandler } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MaterializeService } from './materialize/materialize.service';

Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService,
                private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isAuthenticated()) {
            req = req.clone({
                setHeaders: { Authorization: this.authService.getToken() }
            })
        }
        return next.handle(req).pipe(
            catchError(
                (error: HttpErrorResponse) => this.errorHandler(error)
            )
        )
    }

    private errorHandler(error: HttpErrorResponse): Observable<any> {
        if (error.status === 401) {
            this.router.navigate(['/login'], { queryParams: {sessionExpired: true } })
        }

        return throwError(error)
    }

}