import { Action } from '@ngrx/store';
import { Customer } from '../../models/customer.model';

export enum CustomersActionTypes {
  LOAD_CUSTOMERS = '[Users] Load Customers',
  LOAD_CUSTOMERS_FAIL = '[Users] Load Customers Fail',
  LOAD_CUSTOMERS_SUCCESS = '[Users] Load Customers Success',
  CREATE_CUSTOMER = '[Users] Create Customer',
  CREATE_CUSTOMER_FAIL = '[Users] Create Customer Fail',
  CREATE_CUSTOMER_SUCCESS = '[Users] Create Customer Success',
  UPDATE_CUSTOMER = '[Users] Update Customer',
  UPDATE_CUSTOMER_FAIL = '[Users] Update Customer Fail',
  UPDATE_CUSTOMER_SUCCESS = '[Users] Update Customer Success',
  REMOVE_CUSTOMER = '[Users] Remove Customer',
  REMOVE_CUSTOMER_FAIL = '[Users] Remove Customer Fail',
  REMOVE_CUSTOMER_SUCCESS = '[Users] Remove Customer Success',
}

// Load.
export class LoadCustomers implements Action {
  readonly type = CustomersActionTypes.LOAD_CUSTOMERS;
}

export class LoadCustomersFail implements Action {
  readonly type = CustomersActionTypes.LOAD_CUSTOMERS_FAIL;

  constructor(public payload: any) {
  }
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomersActionTypes.LOAD_CUSTOMERS_SUCCESS;

  constructor(public payload: Customer[]) {
  }
}

// Create.
export class CreateCustomer implements Action {
  readonly type = CustomersActionTypes.CREATE_CUSTOMER;

  constructor(public payload: Customer) {
  }
}

export class CreateCustomerFail implements Action {
  readonly type = CustomersActionTypes.CREATE_CUSTOMER_FAIL;

  constructor(public payload: any) {
  }
}

export class CreateCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.CREATE_CUSTOMER_SUCCESS;

  constructor(public payload: Customer) {
  }
}

// Update.
export class UpdateCustomer implements Action {
  readonly type = CustomersActionTypes.UPDATE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerFail implements Action {
  readonly type = CustomersActionTypes.UPDATE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.UPDATE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

// Remove.
export class RemoveCustomer implements Action {
  readonly type = CustomersActionTypes.REMOVE_CUSTOMER;
  constructor(public payload: Customer) {}
}

export class RemoveCustomerFail implements Action {
  readonly type = CustomersActionTypes.REMOVE_CUSTOMER_FAIL;
  constructor(public payload: any) {}
}

export class RemoveCustomerSuccess implements Action {
  readonly type = CustomersActionTypes.REMOVE_CUSTOMER_SUCCESS;
  constructor(public payload: Customer) {}
}

export type CustomersAction
  = LoadCustomers | LoadCustomersFail | LoadCustomersSuccess
  | CreateCustomer | CreateCustomerFail | CreateCustomerSuccess
  | UpdateCustomer | UpdateCustomerFail | UpdateCustomerSuccess
  | RemoveCustomer | RemoveCustomerFail | RemoveCustomerSuccess
  ;
