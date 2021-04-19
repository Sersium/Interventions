import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { IProbleme } from './typeprobleme';

@Injectable({
  providedIn: 'root'
})
export class TypeproblemeService {

  private baseUrl = 'api/typesprobleme';

  constructor(private http: HttpClient) { }

  obtenirProblemes(): Observable<IProbleme[]> {

    return this.http.get<IProbleme[]>(this.baseUrl).pipe(
      tap(data => console.log('obtenirProblemes: ' + JSON.stringify(data))),
      catchError(this.handleError)

    );
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}