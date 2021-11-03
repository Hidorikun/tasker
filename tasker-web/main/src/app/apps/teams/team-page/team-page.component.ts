import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {AppState} from "../../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {filter, takeUntil} from "rxjs/operators";
import {GetCurrentTeam} from "../../../common/store/store.selectors";
import {LoadCurrentTeam, LoadSprintsForTeam} from "../../../common/store/store.actions";

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.scss']
})
export class TeamPageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(params => {
      this.store.dispatch(LoadCurrentTeam({teamId: params.teamId}));
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
