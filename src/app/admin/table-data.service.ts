import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TableItem } from '@app/admin/table.model';

@Injectable({
  providedIn: 'root'
})
export class TableDataService {
  private dataUrl = 'assets/data.json';

  constructor(private http: HttpClient) { }

  getDemographicsData(): Observable<TableItem[]>{
    return this.http.get<TableItem[]>(this.dataUrl).pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse){
    return throwError(`An error occurred: ${err}`);
  }
}
