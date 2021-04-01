import { Component, OnInit } from '@angular/core';
import { TableDataService } from '@app/shared/table-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-doa-chart',
  templateUrl: './doa-chart.component.html',
  styleUrls: ['./doa-chart.component.scss']
})
export class DoaChartComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Date of Arrival' },
    { data: [], label: 'Move Out Date' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      // red
      borderColor: 'red',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
    {
      // green
      borderColor: 'green',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe({
      next: data => {
        const doa = data.map(i => i.dateOfArrival);
        const moveOutDate = data.map(i => i.moveoutDate);
        const getQuaterFilter = (d: Date, quarter: number, year: number): boolean => d.getMonth() >= 3 * quarter - 2 && d.getMonth() <= 3 * quarter && d.getFullYear() === year;

        const distinctYear = [...new Set(doa.map(d => {return d && new Date(d).getFullYear()}))];
        distinctYear.forEach(y => {
          [1, 2, 3, 4].forEach(q => {
            this.lineChartData[0].data.push(doa.filter(d => getQuaterFilter(new Date(d), q, y)).length);
            this.lineChartData[1].data.push(moveOutDate.filter(d => getQuaterFilter(new Date(d), q, y)).length);
            this.lineChartLabels.push(`Q${q}-${y}`);
          });
        });
      }
    });
}

}
