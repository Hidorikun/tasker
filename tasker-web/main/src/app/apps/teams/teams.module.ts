import {NgModule} from '@angular/core';
import {TeamListComponent} from './team-list/team-list.component';
import {TeamCreationModalComponent} from './team-creation-modal/team-creation-modal.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FeatherModule} from "angular-feather";
import {BacklogPageComponent} from './backlog-page/backlog-page.component';
import {SprintContainerComponent} from './sprint-container/sprint-container.component';
import {SprintBoardComponent} from './sprint-board/sprint-board.component';
import {TeamPageComponent} from './team-page/team-page.component';
import {RouterModule} from "@angular/router";
import {NgbAccordionModule, NgbDropdownModule, NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {TaskCreationModalComponent} from './task-creation-modal/task-creation-modal.component';
import {SprintCreationModalComponent} from './sprint-creation-modal/sprint-creation-modal.component';
import {TaskerCommonModule} from "../../common/common.module";
import {SprintBoardTaskComponent} from './sprint-board/sprint-board-item/sprint-board-task.component';
import {TaskDetailsComponent} from './task-details/task-details.component';
import {QuillModule} from 'ngx-quill';
import {MembersPageComponent} from './members-page/members-page.component';
import {RegisterTeamMemberComponent} from './register-team-member/register-team-member.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    TeamListComponent,
    TeamCreationModalComponent,
    BacklogPageComponent,
    SprintContainerComponent,
    SprintBoardComponent,
    TeamPageComponent,
    TaskCreationModalComponent,
    SprintCreationModalComponent,
    SprintBoardTaskComponent,
    TaskDetailsComponent,
    MembersPageComponent,
    RegisterTeamMemberComponent],
  exports: [
    TeamListComponent,
    TeamCreationModalComponent
  ],
  imports: [
    TaskerCommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeatherModule,
    RouterModule,
    NgbAccordionModule,
    DragDropModule,
    NgbDropdownModule,
    CKEditorModule,
    NgbModule,
  ],
  providers: [
  ]
})
export class TeamsModule { }
