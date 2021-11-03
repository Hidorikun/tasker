import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {Observable, Subject, Subscription} from "rxjs";
import {Task, TaskState, TaskType} from "../../../common/model/Task";
import {
  ClearErrors,
  CreateTaskComment,
  LoadCurrentProject,
  LoadCurrentSprint,
  LoadCurrentTask,
  LoadCurrentTeam,
  LoadTaskAssignableUsers,
  NavigateToDashboardPage,
  NavigateToProjectPage,
  NavigateToTaskDetails,
  NavigateToTeamPage,
  SetBreadCrumbs,
  UpdateTaskAssignee,
  UpdateTaskDetails,
  UpdateTaskEstimation,
  UpdateTaskState
} from "../../../common/store/store.actions";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  GetCurrentProject,
  GetCurrentSprint,
  GetCurrentTask,
  GetCurrentTeam,
  GetTaskAssignableUsers
} from "../../../common/store/store.selectors";
import {filter, takeUntil, tap} from "rxjs/operators";
import {User} from "../../../common/model/User";
import {Team} from "../../../common/model/Team";
import {Sprint} from "../../../common/model/Sprint";
import {Project} from "../../../common/model/Project";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';



@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss']
})
export class TaskDetailsComponent implements OnInit, OnDestroy {
  public Editor = ClassicEditor;

  task$: Observable<Task>;
  private destroy$ = new Subject();
  taskDetailsFormGroup: FormGroup;
  commentFormGroup: FormGroup;
  viewMode = true;
  assignableMembers$: Observable<User[]>;
  taskTmp: Task;
  taskType = TaskType;
  taskState = TaskState;

  team: Team;
  sprint: Sprint;
  project: Project;

  editorConfig = {
    toolbar: ['heading', '|', 'bold', 'italic', 'undo', 'redo', 'checkbox']
  };

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit(): void {

    this.initializeCommentFormGroup();

    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.store.dispatch(LoadCurrentTask({taskId: params.taskId}))
    });

    this.task$ = this.store.select(GetCurrentTask).pipe(
      filter(task => !!task),
      tap(task => {
        this.initializeTaskDetailsFormGroup(task);
        this.viewMode = true;
        this.taskTmp = {...task};
        this.store.dispatch(LoadTaskAssignableUsers({task}));
        this.store.dispatch(LoadCurrentSprint({sprintId: task.sprintId}))
      })
    );

    this.store.select(GetCurrentSprint).pipe(
      filter(sprint => !!sprint)
    ).pipe(takeUntil(this.destroy$)).subscribe(sprint => {
      this.sprint = sprint;
      this.store.dispatch(LoadCurrentTeam({teamId: sprint.teamId}))
    });

    this.store.select(GetCurrentTeam).pipe(
      filter(team => !!team)
    ).pipe(takeUntil(this.destroy$)).subscribe(team => {
      this.team = team;
      this.store.dispatch(LoadCurrentProject({projectId: team.projectId}))
    });

    this.store.select(GetCurrentProject).pipe(
      takeUntil(this.destroy$),
      filter(project => !!project)
    ).subscribe(project => {
      this.project = project;
      this.setBreadCrumbs();
    });

    this.assignableMembers$ = this.store.select(GetTaskAssignableUsers);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setBreadCrumbs() {
    if (!!this.team && !!this.project && !!this.taskTmp && !!this.sprint) {
      const breadCrumbs = [
        {title: 'Dashboard', action: NavigateToDashboardPage()},
        {title: this.project.name, action: NavigateToProjectPage({project: this.project})},
        {title: this.team.name, action: NavigateToTeamPage({team: this.team})},
        {title: this.sprint.name, action: NavigateToTeamPage({team: this.team})},
        {title: `task-${this.taskTmp.id}`, action: NavigateToTaskDetails({task: {...this.taskTmp}})}
      ];

      this.store.dispatch(SetBreadCrumbs({breadCrumbs}))
    }
  }

  editDetails() {
    this.viewMode = false;
  }

  updateDetails() {
    if (this.taskDetailsFormGroup.valid) {
      this.store.dispatch(UpdateTaskDetails({task: this.getTaskDetails()}))
    }
  }

  updateAssignee() {
    if (this.taskDetailsFormGroup.valid) {
      this.store.dispatch(UpdateTaskAssignee({
        taskId: this.taskTmp.id,
        username: this.taskTmp?.assignee?.username
      }))
    }
  }

  getTaskDetails(): Task {
    const task: Task = {};

    task.id = this.taskDetailsFormGroup.get('id').value;
    task.summary = this.taskDetailsFormGroup.get('summary').value;
    task.description = this.taskDetailsFormGroup.get('description').value;
    task.type = this.taskDetailsFormGroup.get('type').value;

    return task;
  }

  shouldShowErrors(fieldName: string) {
    return !this.taskDetailsFormGroup.get(fieldName).valid
      && (this.taskDetailsFormGroup.get(fieldName).dirty || this.taskDetailsFormGroup.get(fieldName).touched)
  }

  getErrorMessage(fieldName: string) {
    const field = this.taskDetailsFormGroup.get(fieldName);

    if (field.getError('required')) {
      return "This field is required";
    }

    if (field.getError('max')) {
      return "The description must be shorter than " + field.getError('max').max + " characters";
    }
  }

  cancel() {
    this.viewMode = true;
    this.store.dispatch(ClearErrors());
  }

  selectAssignee(assignee: User | null) {
    this.taskTmp.assignee = assignee;
  }

  reply() {
    console.log(this.commentFormGroup.get('comment'));
    console.log(this.commentFormGroup.get('comment').value);
    if (this.commentFormGroup.valid) {
      this.store.dispatch(CreateTaskComment({
        taskId: this.taskTmp.id,
        content: this.commentFormGroup.get('comment').value
      }));
      this.commentFormGroup.reset({comment : ''});
    }
  }

  changeState() {
    this.store.dispatch(UpdateTaskState({taskId: this.taskTmp.id, state: this.taskTmp.state}))
  }

  changeEstimation() {
    this.store.dispatch(UpdateTaskEstimation({taskId: this.taskTmp.id, estimation: this.taskTmp.estimation}))
  }

  private initializeCommentFormGroup() {
    this.commentFormGroup = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  private initializeTaskDetailsFormGroup(task: Task) {
    this.taskDetailsFormGroup = this.fb.group({
      id: [task.id],
      summary: [task.summary, Validators.required],
      description: [task.description],
      type: [task.type]
    });
  }

}

