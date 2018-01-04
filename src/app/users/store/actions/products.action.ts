import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';

export enum ProductsActionType {
  LOAD_PRODUCTS = '[Users] Load Products',
  LOAD_PRODUCTS_FAIL = '[Users] Load Products Fail',
  LOAD_PRODUCTS_SUCCESS = '[Users] Load Products Success',
  VISUALISE_PRODUCTS = '[Users] Visualise Products',
}

export class LoadProducts implements Action {
  readonly type = ProductsActionType.LOAD_PRODUCTS;
}

export class LoadProductsFail implements Action {
  readonly type = ProductsActionType.LOAD_PRODUCTS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductsActionType.LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: Product[]) {
  }
}

export class VisualiseProducts implements Action {
  readonly type = ProductsActionType.VISUALISE_PRODUCTS;

  constructor(public payload: number[]) {
  }
}

export type ProductsAction
  = LoadProducts
  | LoadProductsFail
  | LoadProductsSuccess
  | VisualiseProducts
  ;
