import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TableDataSource } from './table-datasource';
import { TableItem } from '@app/admin/table.model';
import { TableDataService } from '../table-data.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TableItem>;
  dataSource: TableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'familySize',
    'dateOfArrival',
    'familyName',
    'firstName',
    'gender',
    'dob',
    'ages',
    'cOO',
    'maritalStatus',
    'relationship',
    'temporaryLocations',
    'room',
    'moveoutDate',
    'age6AndUnder',
    'employment',
    'yearsExp',
    'sector',
    'publicGR',
    'postSecondary',
  ];

  constructor(private tableDataService: TableDataService) {}

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe((data: TableItem[]) => {
      this.dataSource = new TableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource = this.dataSource;
    }, (error) => {
      console.log(`Error fetching demographics data : ${error}`)
    });
  }
  
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
