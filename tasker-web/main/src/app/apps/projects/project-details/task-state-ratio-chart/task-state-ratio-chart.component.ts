import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ApexOptions} from "ng-apexcharts";
import {Store} from "@ngrx/store";
import {AppState} from "../../../../common/store/store.reducers";
import {TaskTypeCount} from "../../../../common/model/TaskTypeCount";
import {Subject} from "rxjs";

@Component({
  selector: 'app-task-state-ratio-chart',
  templateUrl: './task-state-ratio-chart.component.html',
  styleUrls: ['./task-state-ratio-chart.component.scss']
})
export class TaskStateRatioChartComponent implements OnInit, OnDestroy {

  @Input()
  public projectId: number;

  public options: ApexOptions;

  private destroy$ = new Subject();

  constructor(
    private readonly store: Store<AppState>
  ) {
    this.initChart();
  }

  initChart() {
    this.options = {
      series: [
        {
          name: 'Sales',
          data: [0, 150, 130, 60, 180, 120, 180, 80]
        },
        {
          name: 'Expense',
          data: [123, 100, 70, 100, 240, 180, 220, 140]
        },
      ],
      chart: {
        height: 350,
        type: 'area',
        stacked: true,
        fontFamily: 'Montserrat,sans-serif',
        toolbar: {
          show: true
        }
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      fill: {
        type: "solid",
        colors: ['#e9edf2', '#398bf7', '#7460ee'],
        opacity: 1
      },
      colors: ['#e9edf2', '#398bf7', '#7460ee'],
      legend: {
        show: false,
      },
      grid: {
        show: true,
        strokeDashArray: 0,
        borderColor: 'rgba(0,0,0,0.1)',
      },
      xaxis: {
        type: 'category',
        categories: [
          'January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug'
        ],
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#a1aab2'
          }
        }
      },
      tooltip: {
        theme: 'dark',
        marker: {
          fillColors : ['#e9edf2', '#398bf7']
        }
      },
    };

  }

  ngOnInit(): void {
  }

  private updateChart(taskTypeRatio: TaskTypeCount[]) {
    // taskTypeRatio.forEach(r => this.counts.set(r.taskType, r.count));
    //
    // this.chart.series = [
    //   this.counts.get(TaskType.TASK),
    //   this.counts.get(TaskType.STORY),
    //   this.counts.get(TaskType.DEFECT),
    // ];
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
