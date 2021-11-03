import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {FeatherModule} from "angular-feather";
import {ProjectListComponent} from "./project-list/project-list.component";
import {ProjectCreationModalComponent} from "./project-creation-modal/project-creation-modal.component";
import {ProjectDetailsComponent} from './project-details/project-details.component';
import {CustomFormsModule} from "ngx-custom-validators";
import {TaskerCommonModule} from "../../common/common.module";
import { ProjectTeamsComponent } from './project-teams/project-teams.component';
import {TeamsModule} from "../teams/teams.module";
import { TaskTypeRatioChartComponent } from './project-details/task-type-ratio-chart/task-type-ratio-chart.component';
import {NgApexchartsModule} from "ng-apexcharts";
import { TaskStateRatioChartComponent } from './project-details/task-state-ratio-chart/task-state-ratio-chart.component';
import { ProjectAdminsTableComponent } from './project-details/project-admins-table/project-admins-table.component';
import {AddUserViaEmailModalComponent} from "../../common/components/add-user-via-email-modal/add-user-via-email-modal.component";
import { RegisterProjectAdminComponent } from './register-project-admin/register-project-admin.component';
import { ProjectPageComponent } from './project-page/project-page.component';
import {RouterModule} from "@angular/router";


@NgModule({
  imports: [
    TaskerCommonModule,
    FeatherModule,
    NgbDatepickerModule,
    ReactiveFormsModule,
    CustomFormsModule,
    TeamsModule,
    NgApexchartsModule,
    RouterModule,
  ],
  declarations: [
    ProjectListComponent,
    ProjectCreationModalComponent,
    ProjectDetailsComponent,
    ProjectTeamsComponent,
    TaskTypeRatioChartComponent,
    TaskStateRatioChartComponent,
    ProjectAdminsTableComponent,
    RegisterProjectAdminComponent,
    ProjectPageComponent,
  ],
  exports: [
    ProjectListComponent
  ],
})
export class ProjectsModule {
}
