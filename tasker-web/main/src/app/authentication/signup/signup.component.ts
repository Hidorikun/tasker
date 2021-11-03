import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {RegisterUser} from "../../common/store/store.actions";
import {AppState} from "../../common/store/store.reducers";
import {GetRegistrationError} from "../../common/store/store.selectors";
import {of} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {

  signupFormGroup: FormGroup;
  registrationError$ = this.store.select(GetRegistrationError);

  constructor(
    private readonly formBuilder: FormBuilder,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.initializeSignupFormGroup();
  }

  getErrorMessage(fieldName: string) {
    const field = this.signupFormGroup.get(fieldName);

    if (field.getError('required')) {
      return "This field is required";
    }

    if (field.getError('email')) {
      return "Please provide a valid email address";
    }

    if (field.getError('passwordMismatch')) {
      return "The passwords must match";
    }

  }

  shouldShowErrors(fieldName: string) {
    return !this.signupFormGroup.get(fieldName).valid
      && (this.signupFormGroup.get(fieldName).dirty || this.signupFormGroup.get(fieldName).touched)
  }

  onSignup() {
    this.signupFormGroup.markAllAsTouched();
    if (this.signupFormGroup.valid) {
      const registerRequest = {
        username: this.signupFormGroup.get('username').value,
        password: this.signupFormGroup.get('password').value,
        firstName: this.signupFormGroup.get('firstName').value,
        lastName: this.signupFormGroup.get('lastName').value,
        email: this.signupFormGroup.get('email').value,
      };

      this.store.dispatch(RegisterUser({registerRequest}));
    }
  }

  private initializeSignupFormGroup() {
    this.signupFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required,
        () => this.signupFormGroup.get('password').value !== this.signupFormGroup.get('confirmPassword').value
          ? of({ passwordMismatch: true }) : of({})
      ],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

}
