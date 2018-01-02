import * as fromCustomers from '../actions/customers.action';
import {Customer} from '../../models/customer.model';

export interface CustomerState {
  data: Customer[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: CustomerState = {
  data: [],
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: fromCustomers.CustomersAction): CustomerState {
  switch (action.type) {
    case fromCustomers.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCustomers.LOAD_CUSTOMERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      };
    }

    case fromCustomers.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

  }
  return state;
}
