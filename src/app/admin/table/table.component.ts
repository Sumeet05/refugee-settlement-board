import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableItem } from '@app/shared/table.model';
import { TableDataService } from '@shared/table-data.service';
import { CONDITIONS_FUNCTIONS, DATE_CONDITIONS_LIST, NUM_CONDITIONS_LIST, STRING_CONDITIONS_LIST } from '@shared/conditions-utils';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TableItem>;
  dataSource: MatTableDataSource<TableItem>;
  private _filterMethods = CONDITIONS_FUNCTIONS;
  public searchValue: any = {};
  public searchCondition: any = {};
  public numberConditionsList = NUM_CONDITIONS_LIST;
  public stringConditionsList = STRING_CONDITIONS_LIST;
  public dateConditionsList = DATE_CONDITIONS_LIST;
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

  @ViewChild(MatMenuTrigger) triggerBtn: MatMenuTrigger;

  constructor(private tableDataService: TableDataService) { }

  ngOnInit() {
    this.tableDataService.getDemographicsData().subscribe({
      next: data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.table.dataSource = this.dataSource;
    
          this.dataSource.filterPredicate = this.filterPredicate;
      },
      error: err => {
          console.log(`Error fetching demographics data : ${err}`)
      }
    });
  }

  filterPredicate = (item: TableItem, filter : any) => {
    let result = true;
    let keys = Object.keys(item); // keys of the object data
    for (const key of keys) {
      let searchCondition = filter.conditions[key]; // get search filter method
      if (searchCondition && searchCondition !== "none") {
        if (filter.methods[searchCondition](item[key], filter.values[key]) === false) {
          // invoke search filter
          result = false; // if one of the filters method not succeed the row will be remove from the filter result
          break; 
        }
      }
    }
    
    return result;
  }

  applyFilter = () => {
    let searchFilter: any = {
      values: this.searchValue,
      conditions: this.searchCondition,
      methods: this._filterMethods,
    };

    this.dataSource.filter = searchFilter;
    this.triggerBtn.closeMenu();
  }

  clearColumn(columnKey: string) {
    this.searchValue[columnKey] = null;
    this.searchCondition[columnKey] = "none";
    this.applyFilter();
  }

  resetAllFilters() {
    this.dataSource.filter = '';
  }
}
