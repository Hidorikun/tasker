import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-user-via-email-modal',
  templateUrl: './add-user-via-email-modal.component.html',
  styleUrls: ['./add-user-via-email-modal.component.scss']
})
export class AddUserViaEmailModalComponent implements OnInit {

  @Input()
  modal: any;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field.getError('email')) {
      return "Please enter a valid email";
    }
  }

  shouldShowErrors(fieldName: string) {
    return !this.formGroup.get(fieldName).valid
      && (this.formGroup.get(fieldName).dirty || this.formGroup.get(fieldName).touched)
  }

  requestMember() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.modal.close({
        email: this.formGroup.get('email').value,
      })
    }
  }
}
