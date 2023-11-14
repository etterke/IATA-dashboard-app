import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-sales-analytics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './sales-analytics.component.html',
  styleUrl: './sales-analytics.component.scss'
})
export class SalesAnalyticsComponent {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales'
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100]
    }
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
}
