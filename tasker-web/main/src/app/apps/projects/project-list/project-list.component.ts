import {Component, OnDestroy, OnInit} from '@angular/core';
import {Project} from "../../../common/model/Project";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {CreateProject, LoadProjectsForCurrentUser, NavigateToProjectPage} from "../../../common/store/store.actions";
import {Observable} from "rxjs";
import {GetProjects} from "../../../common/store/store.selectors";
import {Router} from "@angular/router";

@Component({
  selector: 'app-projects',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit, OnDestroy {

  projects$: Observable<Project[]>;

  constructor(private modalService: NgbModal,
              private store: Store<AppState>,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LoadProjectsForCurrentUser());

    this.projects$ = this.store.select(GetProjects);
  }

  ngOnDestroy(): void {
    console.log('activities list destroyed');
  }

  openModal(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((project) => {
      this.store.dispatch(CreateProject({project}));
    }, (reason) => {
      console.log(reason);
    });
  }

  openProject(project: Project) {
    this.store.dispatch(NavigateToProjectPage({project}));
  }
}
