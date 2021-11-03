import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../../common/model/User";
import {Observable, Subject, Subscription} from "rxjs";
import {AppState} from "../../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {GetCurrentProject, GetCurrentTeam, GetCurrentTeamMembers} from "../../../common/store/store.selectors";
import {distinctUntilChanged, filter, takeUntil} from "rxjs/operators";
import {
  LoadCurrentProject,
  LoadTeamMembers, NavigateToDashboardPage, NavigateToProjectPage, NavigateToTeamPage,
  NavigateToUserProfile,
  RequestTeamMember, SetBreadCrumbs,
  UpdateSprint
} from "../../../common/store/store.actions";
import {Team} from "../../../common/model/Team";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Project} from "../../../common/model/Project";

@Component({
  selector: 'app-members-page',
  templateUrl: './members-page.component.html',
  styleUrls: ['./members-page.component.scss']
})
export class MembersPageComponent implements OnInit, OnDestroy{
  members$: Observable<User[]>;
  members: User[] = [];
  filteredMembers: User[];
  private destroy$ = new Subject();
  team: Team;
  project: Project;
  searchString = '';

  constructor(
    private readonly store: Store<AppState>,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.store.select(GetCurrentTeam).pipe(
      filter(team => !!team),
      takeUntil(this.destroy$)
    ).subscribe(team => {
      this.team = team;
      this.store.dispatch(LoadTeamMembers({teamId: team.id}));
      this.store.dispatch(LoadCurrentProject({projectId: team.projectId}))
    });

    this.store.select(GetCurrentProject).pipe(
      takeUntil(this.destroy$)
    ).subscribe(project => {
      this.project = project;
      this.setBreadCrumbs();
    });

    this.store.select(GetCurrentTeamMembers).pipe(
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(members => {
      this.members = members;
      this.search();
    });

  }

  setBreadCrumbs() {
    if (!!this.team && !!this.project) {
      const breadCrumbs = [
        {title: 'Dashboard', action: NavigateToDashboardPage()},
        {title: this.project.name, action: NavigateToProjectPage({project: this.project})},
        {title: this.team.name, action: NavigateToTeamPage({team: this.team})},
        {title: 'Members', action: NavigateToTeamPage({team: this.team})}
      ];

      this.store.dispatch(SetBreadCrumbs({breadCrumbs}))
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addMember(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((member) => {
      this.store.dispatch(RequestTeamMember({email: member.email}))
    }, (reason) => {
      console.log(reason);
    });
  }

  openUserDetails(user: User) {
    this.store.dispatch(NavigateToUserProfile({user}))
  }

  search() {
    const searchWords = this.searchString.split(" ").filter(word => word !== " ");
    this.filteredMembers = this.members.filter(member => this.isLookedFor(member, searchWords));
  }

  isLookedFor(member: User, searchWords: string[]): boolean {
    if (searchWords.length === 0) {
      return true;
    }

    for (const word of searchWords) {
      if (`${member.firstName} ${member.lastName}`.toLowerCase().includes(word)
        || `${member.lastName} ${member.firstName}`.toLowerCase().includes(word)
        || member.email.toLowerCase().includes(word)) {
        return true;
      }
    }

    return false;
  }
}
