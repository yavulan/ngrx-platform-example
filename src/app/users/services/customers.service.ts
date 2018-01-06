import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { Update } from '@ngrx/entity';
import 'rxjs/add/observable/throw';

import { Customer } from '../models/customer.model';

const ApiPath = `http://localhost:3000/`;

@Injectable()
export class CustomersService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http
      .get<Customer[]>(`${ApiPath}customers`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  createCustomer(payload: Customer): Observable<Customer> {
    return this.http
      .post<Customer>(`${ApiPath}customers`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateCustomer(payload: Update<Customer>): Observable<Customer> {
    return this.http
      .put<Customer>(`${ApiPath}customers/${payload.id}`, payload.changes)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  removeCustomer(payload: Customer): Observable<Customer> {
    return this.http
      .delete<any>(`${ApiPath}customers/${payload.id}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
