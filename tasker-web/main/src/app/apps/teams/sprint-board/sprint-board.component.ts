import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {AppState} from "../../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {
  GetCurrentProject,
  GetCurrentSprint,
  GetCurrentTeam,
  GetTasksForCurrentSprint
} from "../../../common/store/store.selectors";
import {filter, takeUntil, tap} from "rxjs/operators";
import {
  CreateTask, LoadCurrentProject,
  LoadCurrentSprint, NavigateToDashboardPage, NavigateToProjectPage,
  NavigateToTaskDetails, NavigateToTeamPage, SetBreadCrumbs,
  UpdateTaskState
} from "../../../common/store/store.actions";
import {Team} from "../../../common/model/Team";
import {Sprint} from "../../../common/model/Sprint";
import {Observable, Subject, Subscription} from "rxjs";
import {Task, TaskState} from "../../../common/model/Task";
import {Project} from "../../../common/model/Project";

@Component({
  selector: 'app-sprint-board',
  templateUrl: './sprint-board.component.html',
  styleUrls: ['./sprint-board.component.scss']
})
export class SprintBoardComponent implements OnInit, OnDestroy {

  task: FormGroup | null = null;
  todoToEdit: any = null;

  taskState = TaskState;
  team: Team;
  project: Project;
  sprint: Sprint;
  sprint$: Observable<Sprint>;

  tasksOpen: Task[] = [];
  tasksInProcess: Task[] = [];
  tasksInReview: Task[] = [];
  tasksDone: Task[] = [];

  draggedTask: Task;

  private destroy$ = new Subject();

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.select(GetCurrentTeam).pipe(
      filter(team => !!team),
      takeUntil(this.destroy$)
    ).subscribe(team => {
      this.team = team;
      console.log(team);
      this.store.dispatch(LoadCurrentSprint({sprintId: team.activeSprintId}));
      this.store.dispatch(LoadCurrentProject({projectId: team.projectId}))
    });

    this.store.select(GetCurrentProject).pipe(
      takeUntil(this.destroy$)
    ).subscribe(project => {
      this.project = project;
      this.setBreadCrumbs();
    });

    this.sprint$ = this.store.select(GetCurrentSprint).pipe(
      tap(sprint => { this.sprint = sprint; this.setBreadCrumbs(); })
    );

    this.store.select(GetTasksForCurrentSprint)
      .pipe(takeUntil(this.destroy$))
      .subscribe(tasks => {
        this.tasksOpen = [];
        this.tasksInProcess = [];
        this.tasksInReview = [];
        this.tasksDone = [];

        tasks.forEach(task => this.assignTaskToStateColumn(task));
      });

    this.task = this.fb.group({
      Title: ['', Validators.required],
      Description: ['', Validators.required],
    });
  }

  private assignTaskToStateColumn(task: Task) {
    if (task.state === TaskState.OPEN) {
      this.tasksOpen.push(task);
    }
    if (task.state === TaskState.IN_PROGRESS) {
      this.tasksInProcess.push(task);
    }
    if (task.state === TaskState.IN_REVIEW) {
      this.tasksInReview.push(task);
    }
    if (task.state === TaskState.DONE) {
      this.tasksDone.push(task);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setBreadCrumbs() {
    if (!!this.team && !!this.project && !!this.sprint) {
      const breadCrumbs = [
        {title: 'Dashboard', action: NavigateToDashboardPage()},
        {title: this.project.name, action: NavigateToProjectPage({project: this.project})},
        {title: this.team.name, action: NavigateToTeamPage({team: this.team})},
        {title: this.sprint.name, action: NavigateToTeamPage({team: this.team})}
      ];

      this.store.dispatch(SetBreadCrumbs({breadCrumbs}))
    }
  }

  createTask(modal: any, sprint: Sprint) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title', }).result.then((task) => {
      task.sprintId = sprint.id;
      task.number = sprint.tasksIds.length;
      this.store.dispatch(CreateTask({task}));
    }, (reason) => {
      console.log(reason);
    });
  }

  changeState(event: CdkDragDrop<string[]>, state: TaskState) {
    this.removeTaskFromStateColumn(this.draggedTask);
    this.draggedTask.state = state;
    this.assignTaskToStateColumn(this.draggedTask);
    this.store.dispatch(UpdateTaskState({ taskId: this.draggedTask.id, state}));
    this.draggedTask = null;
  }

  private removeTaskFromStateColumn(task: Task) {
    if (task.state === TaskState.OPEN) {
      this.tasksOpen = this.tasksOpen.filter(t => t.id !== task.id);
    }
    if (task.state === TaskState.IN_PROGRESS) {
      this.tasksInProcess = this.tasksInProcess.filter(t => t.id !== task.id);
    }
    if (task.state === TaskState.IN_REVIEW) {
      this.tasksInReview = this.tasksInReview.filter(t => t.id !== task.id);
    }
    if (task.state === TaskState.DONE) {
      this.tasksDone = this.tasksDone.filter(t => t.id !== task.id);
    }
  }

  openModal(targetModal: NgbModal, data: any) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
    });

    if (data != null) {
      this.todoToEdit = data;
      this.task?.patchValue({
        Title: data.title,
        Description: data.desc
      });
    }
  }

  onSubmit() {
    // if (this.todoToEdit === null) {
    //   this.todos.push({
    //     id: this.todos.length + 1,
    //     title: this.task?.get('Title')?.value,
    //     desc: this.task?.get('Description')?.value,
    //     class: '',
    //   });
    //   alert('Task added !');
    // }
    // else {
    //   let index = -5;
    //
    //   if (this.todos.indexOf(this.todoToEdit) !== -1) {
    //     index = this.todos.indexOf(this.todoToEdit)
    //   }
    //   else if (this.process.indexOf(this.todoToEdit) !== -1) {
    //     index = this.process.indexOf(this.todoToEdit)
    //   }
    //   else if (this.pendings.indexOf(this.todoToEdit) !== -1) {
    //     index = this.pendings.indexOf(this.todoToEdit)
    //   }
    //   else if (this.done.indexOf(this.todoToEdit) !== -1) {
    //     index = this.done.indexOf(this.todoToEdit)
    //   }
    //
    //   if (index !== -5) {
    //     this.todoToEdit.title = this.task?.get('Title')?.value;
    //     this.todoToEdit.desc = this.task?.get('Description')?.value;
    //     this.todos[index] = this.todoToEdit;
    //   }
    // }
    //
    // this.closeBtnClick();

  }

  deleteTask(taskId: any) {
    if (confirm('Are you sure to delete it ?')) {
      this.tasksOpen = this.tasksOpen.filter(task => task.id !== taskId);
      this.tasksInProcess = this.tasksInProcess.filter(task => task.id !== taskId);
      this.tasksInReview = this.tasksInReview.filter(task => task.id !== taskId);
      this.tasksDone = this.tasksDone.filter(task => task.id !== taskId);
    }
  }

  closeBtnClick() {
    this.todoToEdit = null;
    this.modalService.dismissAll();
    this.ngOnInit();
  }

  dragTask(task: Task) {
    this.draggedTask = {...task};
  }

  openTask(task: Task) {
    this.store.dispatch(NavigateToTaskDetails({task}));
  }

}
