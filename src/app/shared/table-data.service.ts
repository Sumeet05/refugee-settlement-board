import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Observer, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableDataSummary, TableItem } from '@app/shared/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private dataUrl = 'assets/data.json';
  private tableDataSumary: TableDataSummary[];

  constructor(private http: HttpClient) {

  }

  fetchDemographicsData(): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.dataUrl).pipe(catchError(this.handleError));
  }

  getDemographicsData(): Observable<TableItem[]> {
    return this.http.get<TableItem[]>(this.dataUrl).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    return throwError(`An error occurred: ${err}`);
  }

  getDemographicsDataSummary(): Observable<TableDataSummary[]> {
    return new Observable((observer: Observer<TableDataSummary[]>) => {
      this.getDemographicsData().subscribe({
        next: (data: TableItem[]) => {
          this.tableDataSumary = [];
          // total count
          this.tableDataSumary.push({
            title: 'Total Applications',
            color: 'primary',
            value: String(data.length),
            icon: 'bubble_chart',
          });

          // Male/Female count
          const maleCount = data.filter(i => i.gender.toLowerCase() === 'male').length;
          const femaleCount = data.filter(i => i.gender.toLowerCase() === 'female').length;
          this.tableDataSumary.push({
            title: 'Gender Ratio',
            color: 'accent',
            value: String(maleCount + "/" + femaleCount),
            icon: 'wc',
          });

          // room count
          const roomCount = data.filter(i => !(String(i.room) === '' || String(i.room) === 'N/A')).length;
          this.tableDataSumary.push({
            title: 'Rooms Alloted',
            color: 'warn',
            value: String(roomCount),
            icon: 'recent_actors',
          });

          // family count
          let tempData = new Map();
          data.forEach((i) => {
            tempData.set(i.familyName, i);
          })
          let unique = [...tempData.values()];
          const familyCount = unique.length;
          this.tableDataSumary.push({
            title: 'Families Served',
            color: 'primary',
            value: String(familyCount),
            icon: 'supervisor_account',
          });

          observer.next(this.tableDataSumary);
          observer.complete();
        }
      });
    });
  }
}
