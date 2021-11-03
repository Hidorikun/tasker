import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {CdkDragDrop} from "@angular/cdk/drag-drop";
import {AppState} from "../../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {Observable, of, Subject} from "rxjs";
import {Sprint} from "../../../common/model/Sprint";
import {
  ArchiveSprint,
  CreateSprint,
  CreateTask,
  LoadArchivedSprintsWithTasksForTeam,
  LoadCurrentProject,
  LoadSprintsWithTasksForTeam,
  MoveTaskToSprint,
  NavigateToDashboardPage,
  NavigateToProjectPage,
  NavigateToTaskDetails,
  NavigateToTeamPage,
  RemoveSprint,
  SetBreadCrumbs,
  StartSprint,
  StopSprint,
  UnarchiveSprint,
  UpdateSprint
} from "../../../common/store/store.actions";
import {
  GetArchivedSprintsForCurrentTeam,
  GetArchivedTasks,
  GetCurrentProject,
  GetCurrentTeam,
  GetSprintsForCurrentTeam,
  GetTasks
} from "../../../common/store/store.selectors";
import {FormBuilder} from "@angular/forms";
import {distinctUntilChanged, filter, takeUntil, tap} from "rxjs/operators";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Task} from "../../../common/model/Task";
import {SprintModalData} from "../sprint-creation-modal/sprint-creation-modal.component";
import {DialogModalData, DialogModalStyleEnum} from "../../../common/components/dialog-modal/dialog-modal.component";
import {Project} from "../../../common/model/Project";
import {Team} from "../../../common/model/Team";

@Component({
  selector: 'app-backlog-page',
  templateUrl: './backlog-page.component.html',
  styleUrls: ['./backlog-page.component.scss']
})
export class BacklogPageComponent implements OnInit, OnDestroy {
  sprints$: Observable<Sprint[]> = of([]);
  archivedSprints$: Observable<Sprint[]> = of([]);
  tasks: Map<number, Array<Task>> = new Map();
  archivedTasks: Map<number, Array<Task>> = new Map();
  sprintModalData: SprintModalData;
  dialogModalData: DialogModalData;
  draggedTask: Task;
  team: Team;
  project: Project;
  private destroy$ = new Subject();

  constructor(
    private store: Store<AppState>,
    private readonly fb: FormBuilder,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {

    this.store.select(GetCurrentTeam).pipe(
      distinctUntilChanged(),
      tap(team => console.log('loaded team')),
      filter(team => !!team),
      takeUntil(this.destroy$)
    ).subscribe(team => {
      this.team = team;
      this.store.dispatch(LoadCurrentProject({projectId: team.projectId}));
      this.store.dispatch(LoadSprintsWithTasksForTeam({teamId: team.id}));
      this.store.dispatch(LoadArchivedSprintsWithTasksForTeam({teamId: team.id}));
    });

    this.store.select(GetCurrentProject).pipe(
      distinctUntilChanged()
    ).pipe(takeUntil(this.destroy$)).subscribe(project => {
      this.project = project;
      this.setBreadCrumbs();
    });

    this.sprints$ = this.store.select(GetSprintsForCurrentTeam).pipe(
      distinctUntilChanged(),
      filter(sprints => !!sprints),
      tap(sprints => console.log('load sprints', sprints)),
    );

    this.archivedSprints$ = this.store.select(GetArchivedSprintsForCurrentTeam).pipe(
      distinctUntilChanged(),
      filter(sprints => !!sprints),
      tap(sprints => console.log('archived sprints', sprints))
    );

    this.store.select(GetTasks).pipe(takeUntil(this.destroy$)).subscribe(tasks => {

      console.log('load tasks', tasks);

      this.tasks = new Map();

      tasks.forEach(task =>
        this.tasks.set(task.sprintId, this.tasks.has(task.sprintId) ? [...this.tasks.get(task.sprintId), task] : [task]));
    });

    this.store.select(GetArchivedTasks).pipe(takeUntil(this.destroy$)).subscribe(tasks => {

      console.log('load archived tasks', tasks);
      this.archivedTasks = new Map();

      tasks.forEach(task =>
        this.archivedTasks.set(
          task.sprintId,
          this.archivedTasks.has(task.sprintId) ? [...this.archivedTasks.get(task.sprintId), task] : [task])
      );
    })
  }

  setBreadCrumbs() {
    if (!!this.team && !!this.project) {
      const breadCrumbs = [
        {title: 'Dashboard', action: NavigateToDashboardPage()},
        {title: this.project.name, action: NavigateToProjectPage({project: this.project})},
        {title: this.team.name, action: NavigateToTeamPage({team: this.team})},
        {title: 'Backlog', action: NavigateToTeamPage({team: this.team})}
      ];

      this.store.dispatch(SetBreadCrumbs({breadCrumbs}))
    }
  }

  moveTaskToSprint(event: CdkDragDrop<string[]>, sprint: Sprint) {
    this.store.dispatch(MoveTaskToSprint({
      task: this.draggedTask,
      sprint,
      position: event.currentIndex,
      teamId: this.team.id
    }));
    this.draggedTask = null;
  }

  createTask(modal: any, sprint: Sprint) {
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title',}).result.then((task) => {
      task.sprintId = sprint.id;
      this.store.dispatch(CreateTask({task}));
    }, (reason) => {
      console.log(reason);
    });
  }

  createSprint() {
    const sprint = {teamId: this.team.id};
    this.store.dispatch(CreateSprint({sprint}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  startSprint(sprint: Sprint) {
    this.store.dispatch(StartSprint({sprintId: sprint.id}));
  }

  canStartSprint(sprints: Sprint[], sprint: Sprint) {
    return sprints.filter(s => s.active).length === 0;
  }

  editSprint(modal: TemplateRef<any>, sprint: Sprint) {
    this.sprintModalData = {
      sprint
    };
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((resultedSprint) => {
      this.store.dispatch(UpdateSprint({sprint: resultedSprint}));
    }, (reason) => {
      console.log(reason);
    });
  }

  stopSprint(modal: TemplateRef<any>, sprint: Sprint) {
    this.dialogModalData = {
      title: "Stop sprint",
      message: `Are you sure you want to stop ${sprint.name}? `,
      actionButtonMessage: 'Stop',
      actionButtonStyle: DialogModalStyleEnum.WARNING
    };
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.store.dispatch(StopSprint({sprintId: sprint.id}));
    }, (reason) => {
      console.log(reason);
    });
  }

  archiveSprint(modal: TemplateRef<any>, sprint: Sprint) {
    this.dialogModalData = {
      title: "Stop sprint",
      message: `Are you sure you want to archive ${sprint.name}? `,
      actionButtonMessage: 'Archive',
      actionButtonStyle: DialogModalStyleEnum.INFO
    };
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.store.dispatch(ArchiveSprint({sprintId: sprint.id}));
    }, (reason) => {
      console.log(reason);
    });
  }

  unarchive(modal: TemplateRef<any>, sprint: Sprint) {
    this.dialogModalData = {
      title: "Unarchive sprint",
      message: `Are you sure you want to unarchive ${sprint.name}? `,
      actionButtonMessage: 'Unarchive',
      actionButtonStyle: DialogModalStyleEnum.INFO
    };
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.store.dispatch(UnarchiveSprint({sprintId: sprint.id}));
    }, (reason) => {
      console.log(reason);
    });
  }

  removeSprint(modal: any, sprint: Sprint) {
    this.dialogModalData = {
      title: "Remove sprint",
      message: `Are you sure you want to remove ${sprint.name}? All tasks associated to this sprint will be removed as well.`,
      actionButtonMessage: 'Remove',
      actionButtonStyle: DialogModalStyleEnum.DANGER
    };
    this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.store.dispatch(RemoveSprint({sprintId: sprint.id}));
    }, (reason) => {
      console.log(reason);
    });
  }

  dragTask(task: Task) {
    this.draggedTask = task;
  }

  openTask(task: Task) {
    this.store.dispatch(NavigateToTaskDetails({task}))
  }
}
