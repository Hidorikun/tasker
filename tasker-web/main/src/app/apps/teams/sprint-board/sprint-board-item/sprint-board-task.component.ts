import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../common/model/Task";

@Component({
  selector: 'app-sprint-board-item',
  templateUrl: './sprint-board-task.component.html',
  styleUrls: ['./sprint-board-task.component.scss']
})
export class SprintBoardTaskComponent implements OnInit {

  @Input()
  task: Task;

  constructor() { }

  ngOnInit(): void {
  }

}
