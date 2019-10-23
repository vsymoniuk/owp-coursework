import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router'
import { Observable, of } from 'rxjs';
import {  Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service'
import { MaterializeService } from '../services/materialize.service'

@Injectable({
    providedIn: 'root'
})

export class AuthGuard  implements CanActivate, CanActivateChild{

    constructor(private authService: AuthService,
                private router: Router) {}
 
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        if(this.authService.isAuthenticated()) {
            return of(true)
        } else { 
            MaterializeService.toast('Not so fast')
            this.router.navigate(['login'],{
                queryParams: {
                    accessDenied: true
                }
            })
            return of(false)
        }
        
    }
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivate(route, state)
    }

}