import { Component, OnInit } from '@angular/core';
import { TableDataService } from '@app/shared/table-data.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-emp-edu-chart',
  templateUrl: './emp-edu-chart.component.html',
  styleUrls: ['./emp-edu-chart.component.scss']
})
export class EmpEduChartComponent implements OnInit {

  public radarChartOptions: ChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Education', 'Entrepenuer', 'Farming', 'Healthcare', 'Legal', 'Manufacturing', 'Public', 'Sciences', 'Technology'];

  public radarChartData: ChartDataSets[] = [
    { data: [], label: 'Employment' }
  ];
  public radarChartType: ChartType = 'radar';

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe({
      next: (data) => {
        var sector: string[] = data.map(i => i.sector);
        const education = sector.filter(i => i.toLowerCase().trim() === 'education').length;
        const entrepenuer = sector.filter(i => i.toLowerCase().trim() === 'enterpreneur').length;
        const farming = sector.filter(i => i.toLowerCase().trim() === 'farming').length;
        const healthcare = sector.filter(i => i.toLowerCase().trim() === 'healthcare').length;
        const legal = sector.filter(i => i.toLowerCase().trim() === 'legal').length;
        const manufacturing = sector.filter(i => i.toLowerCase().trim().includes('manufactur')).length;
        const publicSec = sector.filter(i => i.toLowerCase().trim() === 'public').length;
        const sciences = sector.filter(i => i.toLowerCase().trim().includes('science')).length;
        const technology = sector.filter(i => i.toLowerCase().trim() === 'technology').length;
        this.radarChartData[0].data = [education, entrepenuer, farming, healthcare, legal, manufacturing, publicSec, sciences, technology]
      }
    })
  }

}
