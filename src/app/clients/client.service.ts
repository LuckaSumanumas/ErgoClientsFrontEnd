import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientResponse } from './client-response';

const clientApi = "http://localhost:8085/api/clients/";

@Injectable()
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getClients(fromDate: String, toDate: String): Observable<any> {
    var queryParams: String = this.getQueryParams(fromDate, toDate);
    return this.http.get<ClientResponse>(clientApi + queryParams).pipe(
      catchError(this.handleError)
    );
  }

  private getQueryParams(fromDate: String, toDate: String) {
    if((fromDate==null || fromDate.length==0) && (toDate==null || toDate.length==0)) {
      return "";
    } else {
      return "?startDate=" + fromDate + "&endDate=" + toDate;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log(error.error.message)
    } else {
      console.log(error.status)
    }
    return throwError(
      console.log('Something is wrong!'));
  };

}
