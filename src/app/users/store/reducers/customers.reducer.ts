import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CustomersAction, CustomersActionTypes } from '../actions';
import { Customer } from '../../models/customer.model';

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export interface CustomerState extends EntityState<Customer> {
  // Additional entities state properties.
  loaded: boolean;
  loading: boolean;
}

export const initialState: CustomerState = customerAdapter.getInitialState({
  // Additional entity state properties.
  loaded: false,
  loading: false,
});

export function reducer(state = initialState, action: CustomersAction): CustomerState {
  switch (action.type) {
    case CustomersActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case CustomersActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      return customerAdapter.addMany(action.payload.customers, {
        ...state,
        loaded: true,
        loading: false,
      });
    }

    case CustomersActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case CustomersActionTypes.CREATE_CUSTOMER_SUCCESS: {
      return customerAdapter.addOne(action.payload.customer, state);
    }

    case CustomersActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      return customerAdapter.updateOne(action.payload.customer, state);
    }

    case CustomersActionTypes.REMOVE_CUSTOMER_SUCCESS: {
      return customerAdapter.removeOne(action.payload.customer.id, state);
    }

    default: {
      return state;
    }
  }
}

export const selectCustomersLoaded = (state: CustomerState) => state.loaded;
export const selectCustomersLoading = (state: CustomerState) => state.loading;
