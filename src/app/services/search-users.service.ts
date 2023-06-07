import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from './../../environments/environment.development';
import { UserInfo } from './../interfaces/user-info';

@Injectable({
  providedIn: 'root',
})
export class SearchUsersService {
  URL: string = environment.apiUrl;
  id: string = environment.client_id;
  secret: string = environment.client_secret;

  constructor(private http: HttpClient) {}

  findUser(user: string): Observable<UserInfo> {
    const url = `${this.URL}/${user}`;
    const params = {
      client_id: this.id,
      client_secret: this.secret,
      observe: 'response',
    };

    return this.http
      .get<UserInfo>(url, { params })
      .pipe(catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    return throwError(() => err);
  }
}
