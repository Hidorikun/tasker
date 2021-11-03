import {Component, OnInit} from '@angular/core';
import {LoadCurrentProject} from "../../../common/store/store.actions";
import {Subject, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  private destroy$ = new Subject();

  constructor(
    private readonly store: Store<AppState>,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.store.dispatch(LoadCurrentProject({projectId: params.projectId}))
    })
  }

}
