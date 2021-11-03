import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  public isConsented = false;
  private jwtKey = 'JWT';

  constructor() {}

  public deleteCookie(name) {
    this.setCookie(name, '', -1);
  }

  public getCookie(name: string) {
    const ca: Array<string> = document.cookie.split(';');
    const caLen: number = ca.length;
    const cookieName = `${name}=`;
    let c: string;

    for (let i  = 0; i < caLen; i += 1) {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) === 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  public setCookie(name: string, value: string, expireHours: number = 9, path: string = '') {
    const d: Date = new Date();
    d.setTime(d.getTime() + expireHours * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    const cpath = path ? `; path=${path}` : '';
    document.cookie = `${name}=${value}; ${expires}${cpath}`;
  }

  public consent(isConsent: boolean, e: any, COOKIE: string, EXPIRE_DAYS: number) {
    if (!isConsent) {
      return this.isConsented;
    } else if (isConsent) {
      this.setCookie(COOKIE, '1', EXPIRE_DAYS);
      this.isConsented = true;
      e.preventDefault();
    }
  }

  public saveJWTCookie(jwt: string) {
    this.setCookie(this.jwtKey, jwt);
  }

  public getJWTCookie(): string {
    return this.getCookie(this.jwtKey);
  }

  public hasJWTCookie() {
    return this.getCookie(this.jwtKey) !== '';
  }

  clearCookies() {
    this.deleteCookie(this.jwtKey);
  }
}
