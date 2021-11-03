import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-project-creation-modal',
  templateUrl: './project-creation-modal.component.html',
  styleUrls: ['./project-creation-modal.component.scss']
})
export class ProjectCreationModalComponent implements OnInit {

  @Input()
  modal: any;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.max(10)]
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field.getError('required')) {
      return "This field is required";
    }

    if (field.getError('max')) {
      return "The description must be shorter than " + field.getError('max').max + " characters";
    }

  }

  shouldShowErrors(fieldName: string) {
    return !this.formGroup.get(fieldName).valid
      && (this.formGroup.get(fieldName).dirty || this.formGroup.get(fieldName).touched)
  }

  save() {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.modal.close({
        name: this.formGroup.get('name').value,
        shortDescription: this.formGroup.get('shortDescription').value
      })
    }
  }
}
