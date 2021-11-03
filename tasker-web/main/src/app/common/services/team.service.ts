import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../model/Team";
import {User} from "../model/User";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private prefix = '/api/teams';

  constructor(
    private readonly http: HttpClient,
  ) { }

  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(this.prefix + '/' + id);
  }

  public getTeamsForCurrentUser(): Observable<Team[]> {
    return this.http.get<Team[]>(this.prefix + '/');
  }

  public getTeamsForProject(projectId: number): Observable<Team[]> {
    return this.http.get<Team[]>(this.prefix + '/project/' + projectId);
  }

  public getTeamMembers(teamId: number): Observable<User[]> {
    return this.http.get<User[]>(this.prefix + '/' + teamId + '/members');
  }

  public createTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(this.prefix + '/', team);
  }

  public requestTeamMember(teamId, email): Observable<any> {
    const registerUrl =`${location.origin}/teams/${teamId}/register`;
    return this.http.post<any>(this.prefix + '/requestMember', {unitId: teamId, email, registerUrl});
  }

  public registerTeamMember(teamId): Observable<any> {
    return this.http.post<any>(this.prefix + '/confirmMember', {unitId: teamId});
  }
}
