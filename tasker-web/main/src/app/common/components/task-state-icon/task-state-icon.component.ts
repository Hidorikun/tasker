import {Component, Input, OnInit} from '@angular/core';
import {TaskState} from "../../model/Task";

@Component({
  selector: 'app-task-state-icon',
  templateUrl: './task-state-icon.component.html',
  styleUrls: ['./task-state-icon.component.scss']
})
export class TaskStateIconComponent implements OnInit {

  @Input()
  state: TaskState;

  constructor() { }

  ngOnInit(): void {
    console.log('asdf');
  }

  getClasses() {
    console.log('what');
    return `fa ${this.getIcon(this.state)} ${this.state}`;
  }

  getIcon(state: TaskState) {
    switch (state) {
      case TaskState.OPEN: return 'fa-bookmark';
      case TaskState.IN_PROGRESS: return 'fa-book';
      case TaskState.IN_REVIEW: return 'fa-bug';
      case TaskState.DONE: return 'fa-bug';
    }
  }

}
