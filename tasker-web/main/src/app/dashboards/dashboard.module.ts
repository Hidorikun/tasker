import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {DashboardRoutes} from './dashboard.routing';
import {ChartistModule} from 'ng-chartist';
import {NgApexchartsModule} from "ng-apexcharts";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {FeatherModule} from "angular-feather";
import {ProjectsModule} from "../apps/projects/projects.module";
import {TeamsModule} from "../apps/teams/teams.module";

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModule,
    ChartsModule,
    ChartistModule,
    NgApexchartsModule,
    PerfectScrollbarModule,
    FeatherModule,
    RouterModule.forChild(DashboardRoutes),
    ProjectsModule,
    TeamsModule,
  ],
  exports: [
  ],
  declarations: [
    DashboardComponent,
  ]
})
export class DashboardModule {
}
