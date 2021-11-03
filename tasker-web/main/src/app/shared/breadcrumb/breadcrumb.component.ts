import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, Data } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import {AppState} from "../../common/store/store.reducers";
import {Action, Store} from "@ngrx/store";
import {BreadCrumb} from "../../common/model/BreadCrumb";
import {Observable} from "rxjs";
import {GetBreadCrumbs} from "../../common/store/store.selectors";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent implements OnInit {
  pageInfo: Data = Object.create(null);

  breadCrumbs$: Observable<BreadCrumb[]>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store<AppState>
  ) {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .pipe(map(() => this.activatedRoute))
    //   .pipe(
    //     map(route => {
    //       while (route.firstChild) {
    //         route = route.firstChild;
    //       }
    //       return route;
    //     })
    //   )
    //   .pipe(filter(route => route.outlet === 'primary'))
    //   .pipe(mergeMap(route => route.data))
    //   .pipe(takeUntil(this.destroy$)).subscribe(event => {
    //     this.titleService.setTitle(event['title']);
    //     this.pageInfo = event;
    //   });
  }
  ngOnInit() {
    this.breadCrumbs$ = this.store.select(GetBreadCrumbs);
  }

  onClick(action: Action) {
    this.store.dispatch(action);
  }
}
