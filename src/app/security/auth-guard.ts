import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
      ) {}
    
      canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        
        if (next.data && next.data['requiresLogin'] === false) {
          return true;
        }
        if (this.authService.isLogin() && state.url.includes('/admin/')) {
          return true;
        }
        if (state.url.includes('/admin/')) {
          this.router.navigate(['/login']);
        }
        return false;
      }
}
