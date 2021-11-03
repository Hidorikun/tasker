import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {GetCurrentProject} from "../../../common/store/store.selectors";
import {filter, takeUntil} from "rxjs/operators";
import {RegisterProjectAdmin} from "../../../common/store/store.actions";

@Component({
  selector: 'app-register-project-admin-component',
  templateUrl: './register-project-admin.component.html',
  styleUrls: ['./register-project-admin.component.scss']
})
export class RegisterProjectAdminComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select(GetCurrentProject).pipe(
      filter(project => !!project),
      takeUntil(this.destroy$)
    ).subscribe(project => {
      this.store.dispatch(RegisterProjectAdmin({project}));
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

