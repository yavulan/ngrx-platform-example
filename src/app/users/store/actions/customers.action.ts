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

  constructor(public payload: any) {
  }
}

export class LoadCustomersSuccess implements Action {
  readonly type = LOAD_CUSTOMERS_SUCCESS;

  constructor(public payload: Customer[]) {
  }
}

//
export const CREATE_CUSTOMER = '[Users] Create Customer';
export const CREATE_CUSTOMER_FAIL = '[Users] Create Customer Fail';
export const CREATE_CUSTOMER_SUCCESS = '[Users] Create Customer Success';

export class CreateCustomer implements Action {
  readonly type = CREATE_CUSTOMER;

  constructor(public payload: Customer) {
  }
}

export class CreateCustomerFail implements Action {
  readonly type = CREATE_CUSTOMER_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateCustomerSuccess implements Action {
  readonly type = CREATE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {
  }
}

//
export const UPDATE_CUSTOMER = '[Users] Update Customer';
export const UPDATE_CUSTOMER_FAIL = '[Users] Update Customer Fail';
export const UPDATE_CUSTOMER_SUCCESS = '[Users] Update Customer Success';

export class UpdateCustomer implements Action {
  readonly type = UPDATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerFail implements Action {
  readonly type = UPDATE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = UPDATE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

//
export const REMOVE_CUSTOMER = '[Users] Remove Customer';
export const REMOVE_CUSTOMER_FAIL = '[Users] Remove Customer Fail';
export const REMOVE_CUSTOMER_SUCCESS = '[Users] Remove Customer Success';

export class RemoveCustomer implements Action {
  readonly type = REMOVE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class RemoveCustomerFail implements Action {
  readonly type = REMOVE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveCustomerSuccess implements Action {
  readonly type = REMOVE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

export type CustomersAction
  = LoadCustomers | LoadCustomersFail | LoadCustomersSuccess
  | CreateCustomer | CreateCustomerFail | CreateCustomerSuccess
  | UpdateCustomer | UpdateCustomerFail | UpdateCustomerSuccess
  | RemoveCustomer | RemoveCustomerFail | RemoveCustomerSuccess
  ;
