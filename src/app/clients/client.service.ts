import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ClientResponse } from './client-response';

const clientApi = "http://localhost:8085/api/clients/";

@Injectable()
export class ClientService {

  private errorMsg: String;

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

    const status: number = error.status;
    this.errorMsg = error.error.message;

    if (error.error instanceof ErrorEvent) {
      console.log(this.errorMsg)
    } else {
      console.log(status)
    }
    return throwError(this.errorMsg);
  };

}
