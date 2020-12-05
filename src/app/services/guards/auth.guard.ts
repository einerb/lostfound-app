import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import {
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../authentication.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthenticationService, private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const url: string = state.url;
        return this.checkLogin(url);
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }

    /**
     * @description Verificación de logueo. Sí el usuario no está logueado lo enviará de inmediato al login.
     */
    private checkLogin(url: string) {
        if (this.authService.isLoggedIn()) {
            return true;
        }

        this.authService.redirectUrl = url;

        Swal.fire({
            title: 'Autorización denegada',
            text:
                'Usted no tiene permisos para acceder a esta área. Si existe un error comuníquese con el administrador de la plataforma!',
            icon: 'error',
        });

        this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
    }
}
