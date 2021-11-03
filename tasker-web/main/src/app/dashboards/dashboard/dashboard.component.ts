import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState} from "../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {ClearBreadCrumbs} from "../../common/store/store.actions";

@Component({
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

	ngOnInit(): void {
    this.store.dispatch(ClearBreadCrumbs())
  }
}
