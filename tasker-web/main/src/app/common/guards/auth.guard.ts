import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {catchError, switchMap, tap} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {AppState} from "../store/store.reducers";
import {Store} from "@ngrx/store";
import {LogoutUser} from "../store/store.actions";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean>{

    if (this.authService.isUserAuthenticated()){
      return true;
    }

    return this.router.navigate(['/authentication/login']);
  }
}
