import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sprint} from "../model/Sprint";

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private prefix = '/api/sprints';

  constructor(
    private readonly http: HttpClient
  ) { }


  public getSprint(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(this.prefix + '/' + id);
  }

  public getSprintsForTeam(teamId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.prefix + '/team/' + teamId);
  }

  public getArchivedSprintsForTeam(teamId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(this.prefix + '/team/' + teamId + '/archived');
  }

  public createSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.post<Sprint>(this.prefix + '/', sprint);
  }

  public updateSprint(sprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(this.prefix + '/', sprint);
  }

  public removeSprint(sprintId: number): Observable<Sprint> {
    return this.http.delete<Sprint>(this.prefix + '/'+ sprintId);
  }

  public  startSprint(sprintId: number): Observable<Sprint> {
    return this.http.post<Sprint>(this.prefix + '/activate/' + sprintId, {});
  }

  public stopSprint(sprintId: number): Observable<Sprint> {
    return this.http.post<Sprint>(this.prefix + '/deactivate/' + sprintId, {});
  }

  public  archiveSprint(sprintId: number): Observable<Sprint> {
    return this.http.post<Sprint>(this.prefix + '/archive/' + sprintId, {});
  }

  public  unarchiveSprint(sprintId: number): Observable<Sprint> {
    return this.http.post<Sprint>(this.prefix + '/unarchive/' + sprintId, {});
  }

}
