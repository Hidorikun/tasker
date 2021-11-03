import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task, TaskState} from "../model/Task";
import {User} from "../model/User";
import {TaskTypeCount} from "../model/TaskTypeCount";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private prefix = '/api/tasks';

  constructor(
    private readonly http: HttpClient
  ) { }

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.prefix + '/' + id);
  }

  public getTasksForSprint(sprintId: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.prefix + '/sprint/' + sprintId);
  }

  public getAssignableTasks(taskId: number): Observable<User[]> {
    return this.http.get<User[]>(this.prefix + '/assignable/' + taskId);
  }

  public getTasksForSprints(sprintsIds: number[]): Observable<Task[]> {
    return this.http.post<Task[]>(this.prefix + '/sprint', sprintsIds);
  }

  public getTaskRatioForProject(projectId: number): Observable<TaskTypeCount[]> {
    return this.http.get<TaskTypeCount[]>(this.prefix + '/project/' + projectId + '/task-ratio');
  }

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.prefix + '/', task);
  }

  public createComment(taskId: number, content: string): Observable<Task> {
    return this.http.post<Task>(this.prefix + '/comments', {taskId, content});
  }

  public updateTaskDetails(task: Task): Observable<Task> {
    return this.http.put<Task>(this.prefix + '/', task);
  }

  public updateTaskAssignee(taskId: number, username: string): Observable<Task> {
    return this.http.put<Task>(this.prefix + '/assignee', {taskId, username});
  }

  public updateTaskState(taskId: number, state: TaskState): Observable<Task> {
    return this.http.post<Task>(this.prefix + '/state', {taskId, state});
  }

  public updateTaskEstimation(taskId: number, estimation: number): Observable<Task> {
    return this.http.post<Task>(this.prefix + '/estimation', {taskId, estimation});
  }

  public moveTaskToSprint(taskId: number, sprintId: number, position: number): Observable<Task> {
    return this.http.post<Task>(this.prefix + '/sprint/transition', {taskId, sprintId, position});
  }

}
