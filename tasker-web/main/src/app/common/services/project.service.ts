import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Project} from "../model/Project";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private prefix = '/api/projects';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getProject(id: number): Observable<Project> {
    return this.http.get<Project>(this.prefix + '/' + id);
  }

  public getAdmins(projectId: number): Observable<User[]> {
    return this.http.get<User[]>(this.prefix + '/' + projectId + '/admins');
  }

  public getProjectsForCurrentUser(): Observable<Project[]> {
    return this.http.get<Project[]>(this.prefix + '/');
  }

  public createProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.prefix + '/', project);
  }

  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.prefix + '/', project);
  }

  public requestProjectAdmin(projectId, email): Observable<any> {
    const registerUrl =`${location.origin}/projects/${projectId}/register`;
    return this.http.post<any>(this.prefix + '/requestAdmin', {unitId: projectId, email, registerUrl});
  }

  public registerProjectAdmin(projectId): Observable<any> {
    return this.http.post<any>(this.prefix + '/confirmAdmin', {unitId: projectId});
  }
}
