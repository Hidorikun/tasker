import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../common/store/store.reducers";
import {LoginUser} from "../../common/store/store.actions";
import {LoginRequest} from "../../common/model/LoginRequest";
import {GetCurrentUser, GetLoginError} from "../../common/store/store.selectors";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginFormGroup: FormGroup;

  showLoginForm = true;
  showRecoveryForm = false;

  loginError$ = this.store.select(GetLoginError);
  user$ = this.store.select(GetCurrentUser);

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store<AppState>
  ) {}

  showRecoverForm() {
    this.showLoginForm = !this.showLoginForm;
    this.showRecoveryForm = !this.showRecoveryForm;
  }

  ngOnInit(): void {
    this.initializeLoginFormGroup();
  }

  onLogin() {
    if (this.loginFormGroup.valid) {
      const loginRequest: LoginRequest = {
        username: this.loginFormGroup.get('username').value,
        password: this.loginFormGroup.get('password').value
      };

      this.store.dispatch(LoginUser({loginRequest}));
    }
  }

  private initializeLoginFormGroup() {
    this.loginFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
