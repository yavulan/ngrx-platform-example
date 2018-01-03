import {Action} from '@ngrx/store';
import {Product} from '../../models/product.model';

export const LOAD_PRODUCTS = '[Users] Load Products';
export const LOAD_PRODUCTS_FAIL = '[Users] Load Products Fail';
export const LOAD_PRODUCTS_SUCCESS = '[Users] Load Products Success';
export const VISUALISE_PRODUCTS = '[Users] Visualise Products';

export class LoadProducts implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadProductsFail implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadProductsSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {
  }
}

export class VisualiseProducts implements Action {
  readonly type = VISUALISE_PRODUCTS;

  constructor(public payload: number[]) {
  }
}

export type ProductsAction
  = LoadProducts
  | LoadProductsFail
  | LoadProductsSuccess
  | VisualiseProducts
  ;
