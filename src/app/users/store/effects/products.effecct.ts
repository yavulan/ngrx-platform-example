import {Injectable} from '@angular/core';
import * as productsAction from '../actions/products.action';
import * as fromServices from '../../services';
import {Actions, Effect} from '@ngrx/effects';
import {switchMap, map, catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {Product} from '../../models/product.model';
@Injectable()
export class ProductsEffects {
  constructor(private actions$: Actions, private productsService: fromServices.ProductsService) {
  }

  @Effect()
  loadProducts$ = this.actions$.ofType(productsAction.LOAD_PRODUCTS).pipe(
    switchMap(() => {
      return this.productsService.getProducts().pipe(
        map((products: Product[]) => new productsAction.LoadProductsSuccess(products)),
        catchError(error => of(new productsAction.LoadProductsFail(error)))
      );
    })
  );
}
