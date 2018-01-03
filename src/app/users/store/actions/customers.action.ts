import {Action} from '@ngrx/store';
import {Customer} from '../../models/customer.model';

export const LOAD_CUSTOMERS = '[Users] Load Customers';
export const LOAD_CUSTOMERS_FAIL = '[Users] Load Customers Fail';
export const LOAD_CUSTOMERS_SUCCESS = '[Users] Load Customers Success';

export class LoadCustomers implements Action {
  readonly type = LOAD_CUSTOMERS;
}

export class LoadCustomersFail implements Action {
  readonly type = LOAD_CUSTOMERS_FAIL;

  constructor(public payload: any) {}
}

export class LoadCustomersSuccess implements Action {
  readonly type = LOAD_CUSTOMERS_SUCCESS;

  constructor(public payload: Customer[]) {}
}

export type CustomersAction
  = LoadCustomers
  | LoadCustomersFail
  | LoadCustomersSuccess;
