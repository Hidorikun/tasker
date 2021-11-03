import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {CookieService} from "../services/cookie.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private readonly cookieService: CookieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.cookieService.hasJWTCookie()) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.cookieService.getJWTCookie()}`),
      });

      return next.handle(modifiedReq);
    }

    return next.handle(req);
  }
}
