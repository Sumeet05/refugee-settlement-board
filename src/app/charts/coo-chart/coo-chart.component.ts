import { Component, OnInit } from '@angular/core';
import { TableDataService } from '@app/shared/table-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-coo-chart',
  templateUrl: './coo-chart.component.html',
  styleUrls: ['./coo-chart.component.scss']
})
export class CooChartComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Country of Origin' }
  ];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe({
      next: data => {
        const cOODistinct = [...new Set(data.map(d => d.cOO))];
        this.barChartLabels = cOODistinct;
        this.barChartLabels.forEach(label => {
          this.barChartData[0].data.push(data.filter(d => d.cOO === label).length);
        });
      }
    });
  }

}
