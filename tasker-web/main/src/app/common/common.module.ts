import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from "./services/auth.service";
import {IncomeCounterComponent} from "./components/income-counter/income-counter.component";
import {RecentmessageComponent} from "./components/recent-message/recent-message.component";
import {RecentcommentComponent} from "./components/recent-comment/recent-comment.component";
import {SocialSliderComponent} from "./components/social-slider/social-slider.component";
import {WidgetComponent} from "./components/widget/widget.component";
import {TodoComponent} from "./components/to-do/todo.component";
import {PageAnalyzerComponent} from "./components/page-analyzer/pa.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {SalesEarningComponent} from "./components/sales-earning/sales-earning.component";
import {TotalSalesComponent} from "./components/total-sales/total-sales.component";
import {SalesOverviewComponent} from "./components/sales-overview/sales-overview.component";
import { WebsiteVisitComponent } from './components/website-visit/website-visit.component';
import {VisitSeparationComponent} from "./components/visit-separation/visit-separation.component";
import {MonthlyIncomeComponent} from "./components/monthly-income/monthly-income.component";
import {ActivityComponent} from "./components/activity-timeline/activity.component";
import {EarningComponent} from "./components/earning-report/earning-report.component";
import {FeedsComponent} from "./components/feeds/feeds.component";
import {CustomerSupportComponent} from "./components/customer-support/cs.component";
import {TotalEarningComponent} from "./components/total-earnings/te.component";
import {ProjectCounterComponent} from "./components/project-counter/project-counter.component";
import {NgApexchartsModule} from "ng-apexcharts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ChartistModule} from "ng-chartist";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {FeatherModule} from "angular-feather";
import { DialogModalComponent } from './components/dialog-modal/dialog-modal.component';
import { UserImageComponent } from './components/user-image/user-image.component';
import { UserAutocompleteComponent } from './components/user-autocomplete/user-autocomplete.component';
import { TaskTypeIconComponent } from './components/task-type-icon/task-type-icon.component';
import {AddUserViaEmailModalComponent} from "./components/add-user-via-email-modal/add-user-via-email-modal.component";
import { TaskStateIconComponent } from './components/task-state-icon/task-state-icon.component';


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
    ReactiveFormsModule,
  ],
  declarations: [
    IncomeCounterComponent,
    ProjectCounterComponent,
    RecentcommentComponent,
    RecentmessageComponent,
    SocialSliderComponent,
    TodoComponent,
    ProfileComponent,
    PageAnalyzerComponent,
    WidgetComponent,
    CustomerSupportComponent,
    TotalEarningComponent,
    FeedsComponent,
    EarningComponent,
    ActivityComponent,
    MonthlyIncomeComponent,
    VisitSeparationComponent,
    WebsiteVisitComponent,
    SalesOverviewComponent,
    TotalSalesComponent,
    SalesEarningComponent,
    DialogModalComponent,
    UserImageComponent,
    UserAutocompleteComponent,
    TaskTypeIconComponent,
    AddUserViaEmailModalComponent,
    TaskStateIconComponent,
  ],
  exports: [
    CommonModule,
    EarningComponent,
    RecentcommentComponent,
    SocialSliderComponent,
    ActivityComponent,
    ProfileComponent,
    ProjectCounterComponent,
    MonthlyIncomeComponent,
    VisitSeparationComponent,
    DialogModalComponent,
    UserImageComponent,
    UserAutocompleteComponent,
    TaskTypeIconComponent,
    AddUserViaEmailModalComponent
  ],
  providers: [
    AuthService
  ]
})
export class TaskerCommonModule { }
