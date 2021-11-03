import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {RegisterTeamMember} from "../../../common/store/store.actions";
import {GetCurrentTeam} from "../../../common/store/store.selectors";
import {filter, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-register-team-member',
  templateUrl: './register-team-member.component.html',
  styleUrls: ['./register-team-member.component.scss']
})
export class RegisterTeamMemberComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject();

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
      this.store.select(GetCurrentTeam).pipe(
        filter(team => !!team),
        takeUntil(this.destroy$)
      ).subscribe(team => {
        this.store.dispatch(RegisterTeamMember({team}));
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
