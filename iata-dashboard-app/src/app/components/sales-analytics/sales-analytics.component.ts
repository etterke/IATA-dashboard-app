import { Component, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './sales-analytics.component.html',
  styleUrl: './sales-analytics.component.scss'
})
export class SalesAnalyticsComponent implements OnInit {
  @HostBinding('class.app-sales-analytics') hostClass = true;
  chart: any;

  ngOnInit(): void {
    this.createChart();
  }
  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'line',
      data: {
        labels: [
          '2023-11-10',
          '2023-11-11',
          '2023-11-12',
          '2023-11-13',
          '2023-11-14',
          '2023-11-15',
          '2023-11-16',
          '2023-11-17'
        ],
        datasets: [
          {
            label: 'Sales',
            data: ['467', '576', '572', '79', '92', '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: 'Profit',
            data: ['542', '542', '536', '327', '17', '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: false
  // };
  // public pieChartLabels = [
  //   ['Download', 'Sales'],
  //   ['In', 'Store', 'Sales'],
  //   'Mail Sales'
  // ];
  // public pieChartDatasets = [
  //   {
  //     data: [300, 500, 100]
  //   }
  // ];
  // public pieChartLegend = true;
  // public pieChartPlugins = [];
}
