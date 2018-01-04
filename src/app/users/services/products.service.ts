import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import { Product } from '../models/product.model';

const ApiPath = `http://localhost:3000/`;

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${ApiPath}products`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
