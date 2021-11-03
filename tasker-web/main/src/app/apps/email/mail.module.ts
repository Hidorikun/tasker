import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PipesModule } from './pipes/pipes.module';
import { MailAppState } from './mail-app-state.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MailComponent } from './mail.component';
import { MailComposeComponent } from './mail-compose/mail-compose.component';
import { MailListComponent } from './mail-list/mail-list.component';
import { MailDetailComponent } from './mail-detail/mail-detail.component';

export const routes = [
  {
    path: '',
    component: MailComponent,
    children: [
      { path: '', redirectTo: 'mail-list/inbox', pathMatch: 'full' },
      { path: 'mail-list/:type', component: MailListComponent },
      { path: 'mail-compose', component: MailComposeComponent },
      { path: 'mail-list/:type/:id', component: MailDetailComponent }
    ],
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipesModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MailComponent,
    MailComposeComponent,
    MailListComponent,
    MailDetailComponent
  ],
  providers: [MailAppState]
})
export class MailModule { }
