import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Product } from '../../models/product.model';
import { ProductsActionType } from '../actions/products.action';
import * as productsAction from '../actions/products.action';
import * as fromServices from '../../services';

@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions,
              private productsService: fromServices.ProductsService) {
  }

  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType<productsAction.LoadProducts>(ProductsActionType.LOAD_PRODUCTS),
    switchMap(() => {
      return this.productsService.getProducts().pipe(
        map((products: Product[]) => new productsAction.LoadProductsSuccess(products)),
        catchError(error => of(new productsAction.LoadProductsFail(error)))
      );
    })
  );
}
