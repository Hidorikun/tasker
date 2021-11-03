import {Component, Input, OnInit} from '@angular/core';
import {Team} from "../../../common/model/Team";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {CreateTeam, LoadTeamsForCurrentUser, NavigateToTeamPage} from "../../../common/store/store.actions";
import {Observable} from "rxjs";
import {GetTeams} from "../../../common/store/store.selectors";
import {Project} from "../../../common/model/Project";
import {Router} from "@angular/router";

@Component({
  selector: 'app-teams',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams$: Observable<Team[]>;

  constructor(private modalService: NgbModal,
              private store: Store<AppState>,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LoadTeamsForCurrentUser());

    this.teams$ = this.store.select(GetTeams);
  }

  openTeam(team: Team) {
    this.store.dispatch(NavigateToTeamPage({team}));
  }
}
