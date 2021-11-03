import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable, Subject, Subscription} from "rxjs";
import {Project} from "../../../common/model/Project";
import {
  ClearErrors,
  NavigateToDashboardPage,
  NavigateToProjectPage,
  SetBreadCrumbs,
  UpdateProject
} from "../../../common/store/store.actions";
import {GetCurrentProject, GetCurrentUser} from "../../../common/store/store.selectors";
import {filter, takeUntil, tap} from "rxjs/operators";
import {User} from "../../../common/model/User";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit, OnDestroy {
  project$: Observable<Project>;
  project: Project;
  user: User;
  projectFormGroup: FormGroup;
  private destroy$ = new Subject();
  viewMode = true;
  isUserAdmin = false;

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.store.select(GetCurrentUser)
      .pipe(takeUntil(this.destroy$))
      .subscribe(user => {
        this.user = user;
        this.setIsUserAdmin();
      });

    this.project$ = this.store.select(GetCurrentProject).pipe(
      filter(project => !!project),
      tap(project => {
        this.project = project;
        this.initializeProjectFormGroup(project);
        this.viewMode = true;
        this.setBreadCrumbs(project);
        this.setIsUserAdmin();
      })
    );
  }

  setBreadCrumbs(project: Project) {
    const breadCrumbs = [
      {title: 'Dashboard', action: NavigateToDashboardPage()},
      {title: project.name, action: NavigateToProjectPage({project})}
    ];

    this.store.dispatch(SetBreadCrumbs({breadCrumbs}))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  editDetails() {
    this.viewMode = false;
  }

  saveDetails() {
    if (this.projectFormGroup.valid) {
      this.store.dispatch(UpdateProject({project: this.getFormProject()}))
    }
  }

  getFormProject(): Project {
    const project: Project = {};

    project.id = this.projectFormGroup.get('id').value;
    project.name = this.projectFormGroup.get('name').value;
    project.shortDescription = this.projectFormGroup.get('shortDescription').value;

    return project;
  }

  private initializeProjectFormGroup(project: Project) {
    this.projectFormGroup = this.fb.group({
      id: [project.id],
      name: [project.name, Validators.required],
      shortDescription: [project.shortDescription, Validators.max(100)]
    });
  }

  shouldShowErrors(fieldName: string) {
    return !this.projectFormGroup.get(fieldName).valid
      && (this.projectFormGroup.get(fieldName).dirty || this.projectFormGroup.get(fieldName).touched)
  }

  getErrorMessage(fieldName: string) {
    const field = this.projectFormGroup.get(fieldName);

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

  private setIsUserAdmin() {
    this.isUserAdmin =  (!!this.user && !!this.project && this.project.adminIds.includes(this.user.id));
  }
}
