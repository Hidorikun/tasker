import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexOptions} from "ng-apexcharts";
import {AppState} from "../../../../common/store/store.reducers";
import {Store} from "@ngrx/store";
import {Subject, Subscription} from "rxjs";
import {TaskTypeCount} from "../../../../common/model/TaskTypeCount";
import {LoadTaskRatioForProject} from "../../../../common/store/store.actions";
import {GetProjectTaskRatio} from "../../../../common/store/store.selectors";
import {TaskType} from "../../../../common/model/Task";
import {filter, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-task-type-ratio-chart',
  templateUrl: './task-type-ratio-chart.component.html',
  styleUrls: ['./task-type-ratio-chart.component.scss']
})
export class TaskTypeRatioChartComponent implements OnInit, OnDestroy {

  @Input()
  public projectId: number;

  public chart: ApexOptions;

  private destroy$ = new Subject();

  taskTypes = Object.keys(TaskType).map(key => TaskType[key]);
  counts: Map<TaskType, number> = new Map<TaskType, number>();

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.initChart();
  }

  ngOnInit(): void {
    this.store.dispatch(LoadTaskRatioForProject({projectId: this.projectId}));

    this.store.select(GetProjectTaskRatio).pipe(
      filter(taskTypeRatio => !!taskTypeRatio && taskTypeRatio.length > 0),
      takeUntil(this.destroy$)
    ).subscribe(taskTypeRatio => this.updateChart(taskTypeRatio))
  }

  private initChart() {
    this.chart = {
      series: [1, 2, 2],
      chart: {
        fontFamily: 'Montserrat,sans-serif',
        type: 'donut',
        height: 240
      },
      plotOptions: {
        pie: {
          donut: {
            size: '70px',
          }
        }
      },
      tooltip: {
        fillSeriesColor: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      legend: {
        show: false
      },
      labels: ['Task', 'Story', 'Defect'],
      colors: ['#06d79c', '#FFA500', '#FF0000'],
    };
  }

  private updateChart(taskTypeRatio: TaskTypeCount[]) {
    taskTypeRatio.forEach(r => this.counts.set(r.taskType, r.count));

    this.chart.series = [
      this.counts.get(TaskType.TASK),
      this.counts.get(TaskType.STORY),
      this.counts.get(TaskType.DEFECT),
    ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
