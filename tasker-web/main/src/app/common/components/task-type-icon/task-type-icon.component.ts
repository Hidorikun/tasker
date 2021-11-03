import {Component, Input, OnInit} from '@angular/core';
import {TaskType} from "../../model/Task";

@Component({
  selector: 'app-task-type-icon',
  templateUrl: './task-type-icon.component.html',
  styleUrls: ['./task-type-icon.component.scss']
})
export class TaskTypeIconComponent implements OnInit {

  @Input()
  type: TaskType;

  constructor() { }

  ngOnInit(): void {
  }

  getClasses() {
    return `fa ${this.getIcon(this.type)} ${this.type}`;
  }

  getIcon(type: TaskType) {
    switch (type) {
      case TaskType.TASK: return 'fa-bookmark';
      case TaskType.STORY: return 'fa-book';
      case TaskType.DEFECT: return 'fa-bug';
    }
  }

}
