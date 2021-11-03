import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {BlankComponent} from './layouts/blank/blank.component';
import {AuthGuard} from "./common/guards/auth.guard";
import {UserProfileComponent} from "./apps/profile/user-profile.component";
import {ProjectDetailsComponent} from "./apps/projects/project-details/project-details.component";
import {BacklogPageComponent} from "./apps/teams/backlog-page/backlog-page.component";
import {SprintBoardComponent} from "./apps/teams/sprint-board/sprint-board.component";
import {TeamPageComponent} from "./apps/teams/team-page/team-page.component";
import {TaskDetailsComponent} from "./apps/teams/task-details/task-details.component";
import {MembersPageComponent} from "./apps/teams/members-page/members-page.component";
import {RegisterTeamMemberComponent} from "./apps/teams/register-team-member/register-team-member.component";
import {RegisterProjectAdminComponent} from "./apps/projects/register-project-admin/register-project-admin.component";
import {ProjectPageComponent} from "./apps/projects/project-page/project-page.component";

export const AppRoutes: Routes = [
	{
		path: '',
		component: FullComponent,
    canActivate: [AuthGuard],
		children: [
			{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
			{
				path: 'dashboard',
				loadChildren: () => import('./dashboards/dashboard.module').then(m => m.DashboardModule)
			},
      {
        path: 'projects/:projectId',
        component: ProjectPageComponent,
        children: [
          {
            path: 'details',
            component: ProjectDetailsComponent,
            data: {
              urls: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'currentProject' }
              ]
            },
          },
          {
            path: 'register',
            component: RegisterProjectAdminComponent,
          }
        ]
      },
      {
        path: 'teams/:teamId',
        component: TeamPageComponent,
        children: [
          {
            path: 'backlog',
            component: BacklogPageComponent
          },
          {
            path: 'sprint-board',
            component: SprintBoardComponent
          },
          {
            path: 'members',
            component: MembersPageComponent
          },
          {
            path: 'register',
            component: RegisterTeamMemberComponent
          }
        ]
      },
      {
        path: 'users/profiles/:username',
        component: UserProfileComponent
      },
      {
        path: 'tasks/:taskId',
        component: TaskDetailsComponent
      },
			{
				path: 'starter',
				loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
			},
			// {
			// 	path: 'component',
			// 	loadChildren: () => import('./component/component.module').then(m => m.ComponentsModule)
			// },
			// { path: 'cards', loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule) },
			// { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
			{ path: 'forms', loadChildren: () => import('./form/forms.module').then(m => m.FormModule) },
			// { path: 'tables', loadChildren: () => import('./table/tables.module').then(m => m.TablesModule) },
			// { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartModule) },
			// {
			// 	path: 'widgets',
			// 	loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule)
			// },
			// { path: 'ecom', loadChildren: () => import('./ecommerce/ecom.module').then(m => m.EcomModule) },
			// {
			// 	path: 'timeline',
			// 	loadChildren: () => import('./timeline/timeline.module').then(m => m.TimelineModule)
			// },
			// {
			// 	path: 'extra-component',
			// 	loadChildren:
			// 		() => import('./extra-component/extra-component.module').then(m => m.ExtraComponentModule)
			// },
			// { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
			// { path: 'apps/email', loadChildren: () => import('./apps/email/mail.module').then(m => m.MailModule) },
			// { path: 'maps', loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule) },
			// {
			// 	path: 'sample-pages',
			// 	loadChildren: () => import('./sample-pages/sample-pages.module').then(m => m.SamplePagesModule)
			// },
			// {
			// 	path: 'sub-child',
			// 	loadChildren: () => import('./sub-child/sub-child.module').then(m => m.SubchildModule)
			// }
		]
	},
	{
		path: '',
		component: BlankComponent,
		children: [
			{
				path: 'authentication',
				loadChildren:
					() => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
			}
		]
	},
	// {
	// 	path: '**',
	// 	redirectTo: '/authentication/404'
	// }
];
