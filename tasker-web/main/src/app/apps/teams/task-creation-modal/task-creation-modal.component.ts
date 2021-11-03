import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TaskType} from "../../../common/model/Task";

@Component({
  selector: 'app-task-creation-modal',
  templateUrl: './task-creation-modal.component.html',
  styleUrls: ['./task-creation-modal.component.scss']
})
export class TaskCreationModalComponent implements OnInit {

  @Input()
  modal: any;

  formGroup: FormGroup;
  taskType = TaskType;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      summary: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.maxLength(65535)],
      type: [TaskType.TASK]
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
        summary: this.formGroup.get('summary').value,
        description: this.formGroup.get('description').value,
        type: this.formGroup.get('type').value
      })
    }
  }
}
