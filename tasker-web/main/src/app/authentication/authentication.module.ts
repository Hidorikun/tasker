import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {NotfoundComponent} from './404/not-found.component';
import {LockComponent} from './lock/lock.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';

import {AuthenticationRoutes} from './authentication.routing';
import {TaskerCommonModule} from "../common/common.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthenticationRoutes),
    NgbModule,
    TaskerCommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    NotfoundComponent,
    LoginComponent,
    SignupComponent,
    LockComponent,
  ]
})
export class AuthenticationModule {}
