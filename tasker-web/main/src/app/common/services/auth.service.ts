import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterRequest} from "../model/RegisterRequest";
import {LoginResponse} from "../model/LoginResponse";
import {Observable} from "rxjs";
import {RegisterResponse} from "../model/RegisterResponse";
import {User} from "../model/User";
import {CookieService} from "./cookie.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient,
    private readonly cookieService: CookieService) {}

  public login(loginRequest: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/login', loginRequest);
  }

  public register(registerRequest: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/register', registerRequest)
  }

  public isUserAuthenticated() {
    return this.cookieService.hasJWTCookie();
  }

  public logoutUser() {
    this.cookieService.clearCookies();
  }
}
