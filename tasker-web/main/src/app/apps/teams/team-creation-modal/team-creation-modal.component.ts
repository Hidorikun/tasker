import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-team-creation-modal',
  templateUrl: './team-creation-modal.component.html',
  styleUrls: ['./team-creation-modal.component.scss']
})
export class TeamCreationModalComponent implements OnInit {

  @Input()
  modal: any;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      name: ['', Validators.required],
      shortDescription: ['', Validators.maxLength(100)]
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field.getError('required')) {
      return "This field is required";
    }

    if (field.getError('maxlength')) {
      return "The description must be shorter than " + field.getError('maxlength').max + " characters";
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
