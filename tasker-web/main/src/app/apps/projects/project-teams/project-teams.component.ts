import {Component, Input, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Team} from "../../../common/model/Team";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Store} from "@ngrx/store";
import {AppState} from "../../../common/store/store.reducers";
import {
  CreateTeam,
  LoadTeamsForCurrentUser,
  LoadTeamsForProject,
  NavigateToTeamPage
} from "../../../common/store/store.actions";
import {GetTeams, GetTeamsForCurrentProject} from "../../../common/store/store.selectors";

@Component({
  selector: 'app-project-teams',
  templateUrl: './project-teams.component.html',
  styleUrls: ['./project-teams.component.scss']
})
export class ProjectTeamsComponent implements OnInit {

  @Input()
  projectId: number;

  @Input()
  isUserAdmin: boolean;

  teams$: Observable<Team[]>;

  constructor(private modalService: NgbModal,
              private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.teams$ = this.store.select(GetTeamsForCurrentProject);
  }

  openModal(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((team) => {
      team.projectId = this.projectId;
      this.store.dispatch(CreateTeam({team}));
    }, (reason) => {
      console.log(reason);
    });
  }

  openTeam(team: Team) {
    this.store.dispatch(NavigateToTeamPage({team}));
  }
}
