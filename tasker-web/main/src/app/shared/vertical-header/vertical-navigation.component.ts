import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {TranslateService} from '@ngx-translate/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../common/store/store.reducers";
import {User} from "../../common/model/User";
import {Observable} from "rxjs";
import {GetCurrentUser} from "../../common/store/store.selectors";
import {filter} from "rxjs/operators";
import {LogoutUser} from "../../common/store/store.actions";

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements AfterViewInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};

  public currentUser$: Observable<User>;

  public showSearch = false;

  constructor(
    private modalService: NgbModal,
    private translate: TranslateService,
    private store: Store<AppState>) {
    translate.setDefaultLang('en');
  }

  ngAfterViewInit() {
    this.currentUser$ = this.store.select(GetCurrentUser).pipe(
      filter(user => user != null)
    );
  }

  logout() {
    this.store.dispatch(LogoutUser());
  }

  private getImage(image: Blob) {
    return 'data:image/jpeg;base64,' + image;
  }
}
