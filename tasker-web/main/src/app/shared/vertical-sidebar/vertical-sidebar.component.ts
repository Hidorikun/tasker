import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {Action, Store} from "@ngrx/store";
import {combineLatest, Subject, Subscription} from "rxjs";
import {GetMenuProjects, GetMenuTeams, GetProjects, GetTeams} from "../../common/store/store.selectors";
import {AppState} from "../../common/store/store.reducers";
import {
  LoadProjectsForMenu,
  LoadTeamsForMenu,
  NavigateToProjectPage, NavigateToTeamBacklogPage, NavigateToTeamMembersPage,
  NavigateToTeamPage, NavigateToTeamSprintBoardPage
} from "../../common/store/store.actions";
import {Project} from "../../common/model/Project";
import {Team} from "../../common/model/Team";
import {takeUntil} from "rxjs/operators";

interface MenuItem {
  navAction: Action,
  title: string,
  icon: string,
  class: string,
  extralink: boolean,
  label: string,
  labelClass: string,
  submenu: MenuItem[],
  visible: boolean
}

@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent implements OnInit, OnDestroy{
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: MenuItem[] = [];
  path = '';

  private destroy$ = new Subject();

  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleNotify() {
    this.notify.emit(!this.showClass);
  }

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.store.dispatch(LoadProjectsForMenu());
    this.store.dispatch(LoadTeamsForMenu());

    combineLatest([
      this.store.select(GetMenuProjects),
      this.store.select(GetMenuTeams)
    ]).pipe(takeUntil(this.destroy$))
      .pipe(takeUntil(this.destroy$)).subscribe(([projects, teams]) => this.generateMenuItems(projects, teams))
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  private generateMenuItems(projects: Project[], teams: Team[]) {
    this.sidebarnavItems = [
      this.computeProjectMenuItems(projects),
      this.computeTeamMenuItems(teams)
    ]
  }

  private projectToMenuItem(project: Project): MenuItem {
    return {
      navAction: NavigateToProjectPage({project}),
      title: project.name,
      icon: 'mdi mdi-octagram',
      class: '',
      label: '',
      labelClass: '',
      extralink: false,
      submenu: [],
      visible: true,
    };
  }

  private teamToMenuItem(team: Team): MenuItem {
    return {
      navAction: NavigateToTeamPage({team}),
      title: team.name,
      icon: 'mdi mdi-octagram',
      class: '',
      label: '',
      labelClass: '',
      extralink: false,
      submenu: [
        {
          navAction: NavigateToTeamSprintBoardPage({team}),
          title: 'Sprint board',
          icon: 'mdi mdi-octagram',
          class: '',
          label: '',
          labelClass: '',
          extralink: false,
          submenu: [],
          visible: true
        },
        {
          navAction: NavigateToTeamBacklogPage({team}),
          title: 'Backlog',
          icon: 'mdi mdi-octagram',
          class: '',
          label: '',
          labelClass: '',
          extralink: false,
          submenu: [],
          visible: true
        },
        {
          navAction: NavigateToTeamMembersPage({team}),
          title: 'Members',
          icon: 'mdi mdi-octagram',
          class: '',
          label: '',
          labelClass: '',
          extralink: false,
          submenu: [],
          visible: true
        }
      ],
      visible: true
    };
  }

  private computeProjectMenuItems(projects: Project[]): MenuItem {
    return {
      navAction: null,
      title: 'Projects',
      icon: 'globe',
      class: 'has-arrow',
      label: '',
      labelClass: '',
      extralink: false,
      submenu: projects.map(project => this.projectToMenuItem(project)),
      visible: true
    };
  }

  private computeTeamMenuItems(teams: Team[]): MenuItem {
    return {
      navAction: null,
      title: 'Teams',
      icon: 'users',
      class: 'has-arrow',
      label: '',
      labelClass: '',
      extralink: false,
      submenu: teams.map(team => this.teamToMenuItem(team)),
      visible: true
    }
  }


  clickMenuItem(sidebarnavItem: MenuItem) {
    if (!!sidebarnavItem.navAction) {
      this.store.dispatch(sidebarnavItem.navAction);
    } else {
      sidebarnavItem.visible = !sidebarnavItem.visible
    }
  }
}
//
// {
//   path: '',
//     title: 'Projects',
//   icon: 'globe',
//   class: 'has-arrow',
//   label: '',
//   labelClass: '',
//   extralink: false,
//   submenu: [
//   {
//     path: 'sub-child',
//     title: 'Second Level',
//     icon: 'mdi mdi-octagram',
//     class: '',
//     label: '',
//     labelClass: '',
//     extralink: true,
//     submenu: []
//   },
//   {
//     path: '/sub-child',
//     title: 'Second Child',
//     icon: 'mdi mdi-octagram',
//     class: 'has-arrow',
//     label: '',
//     labelClass: '',
//     extralink: false,
//     submenu: [
//       {
//         path: '/sub-child/td-child-one',
//         title: 'Third 1.1',
//         icon: 'mdi mdi-playlist-plus',
//         class: '',
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []
//       },
//       {
//         path: '/sub-child/td-child-two',
//         title: 'Third 1.2',
//         icon: 'mdi mdi-playlist-plus',
//         class: '',
//         label: '',
//         labelClass: '',
//         extralink: false,
//         submenu: []
//       }
//     ]
//   }
// ]
// }
