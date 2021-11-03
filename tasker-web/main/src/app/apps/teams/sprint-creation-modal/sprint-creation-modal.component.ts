import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Sprint} from "../../../common/model/Sprint";

export interface SprintModalData {
  sprint?: Sprint
}

@Component({
  selector: 'app-sprint-creation-modal',
  templateUrl: './sprint-creation-modal.component.html',
  styleUrls: ['./sprint-creation-modal.component.scss']
})
export class SprintCreationModalComponent implements OnInit {

  @Input()
  modal: any;

  @Input()
  data: SprintModalData;

  formGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      id: [!!this.data.sprint ? this.data.sprint.id : -1],
      name: [!!this.data.sprint ? this.data.sprint.name : '', [Validators.required, Validators.maxLength(30)]],
    });
  }

  getErrorMessage(fieldName: string) {
    const field = this.formGroup.get(fieldName);

    if (field.getError('required')) {
      return "This field is required";
    }

    if (field.getError('maxlength')) {
      return "This field must be shorter than " + field.getError('maxlength').max + " characters";
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
        id: this.formGroup.get('id').value,
        name: this.formGroup.get('name').value,
      })
    }
  }
}
