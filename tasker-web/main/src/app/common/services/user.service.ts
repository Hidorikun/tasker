import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private prefix = '/api/users';

  constructor(
    private readonly http: HttpClient
  ) { }

  public loadCurrentUser(): Observable<User> {
    return this.http.get<User>(this.prefix + '/current')
  }

  public loadUser(username: string): Observable<User> {
    return this.http.get<User>(this.prefix + '/profiles/' + username)
  }

  public updateProfile(userProfile: User): Observable<User> {
    return this.http.put<User>(this.prefix + '/profiles', userProfile)
  }

  public uploadProfileImage(image: File): Observable<any> {

    if (image == null) {
      return this.http.delete<any>('/api/users/profiles/image');
    }

    const formData = new FormData();
    formData.append('imageFile', image);

    return this.http.put<any>('/api/users/profiles/image', formData);
  }
}
