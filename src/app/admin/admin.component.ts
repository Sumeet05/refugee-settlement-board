import { Component, OnInit } from '@angular/core';
import { TableDataService } from '@app/shared/table-data.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private tableDataService: TableDataService) { }

  ngOnInit(): void {
    if (environment.production) {
      this.tableDataService.loadDemographics().subscribe();
    }
  }

}
