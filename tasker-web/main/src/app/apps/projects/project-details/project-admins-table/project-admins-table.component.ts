import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subject, Subscription} from "rxjs";
import {User} from "../../../../common/model/User";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../common/store/store.reducers";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {
  LoadProjectAdmins,
  NavigateToUserProfile,
  RequestProjectAdmin,
  RequestTeamMember
} from "../../../../common/store/store.actions";
import {GetCurrentProjectAdmins} from "../../../../common/store/store.selectors";

@Component({
  selector: 'app-project-admins-table',
  templateUrl: './project-admins-table.component.html',
  styleUrls: ['./project-admins-table.component.scss']
})
export class ProjectAdminsTableComponent implements OnInit, OnDestroy {
  admins$: Observable<User[]>;
  private destroy$ = new Subject();

  @Input()
  projectId: number;

  @Input()
  isUserAdmin: boolean;

  constructor(
    private readonly store: Store<AppState>,
    private readonly modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.store.dispatch(LoadProjectAdmins({projectId: this.projectId}));

    this.admins$ = this.store.select(GetCurrentProjectAdmins);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addAdmin(modal: any) {
    this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((member) => {
      this.store.dispatch(RequestProjectAdmin({projectId: this.projectId, email: member.email}))
    }, (reason) => {
      console.log(reason);
    });
  }

  openUserDetails(user: User) {
    this.store.dispatch(NavigateToUserProfile({user}))
  }
}
