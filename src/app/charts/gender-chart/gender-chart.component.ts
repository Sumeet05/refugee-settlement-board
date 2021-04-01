import { Component, OnInit } from '@angular/core';
import { TableDataService } from '@app/shared/table-data.service';
import { TableItem } from '@app/shared/table.model';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';

@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'left',
    }
  };
  public pieChartLabels: Label[] = ['Male', 'Female', 'Other'];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe({
      next: (data: TableItem[]) => {
        var genderList = data.map(i => i.gender);
        const maleCount = genderList.filter(s => s.toLowerCase().trim() === 'male').length;
        const femaleCount = genderList.filter(s => s.toLowerCase().trim() === 'female').length;
        const otherCount = genderList.length - maleCount - femaleCount;
        this.pieChartData = [maleCount, femaleCount, otherCount];
      }
    })
  }

}
