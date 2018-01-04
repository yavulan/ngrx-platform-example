import { CustomersAction, CustomersActionTypes } from '../actions/customers.action';
import { Customer } from '../../models/customer.model';

export interface CustomerState {
  entities: { [id: number]: Customer };
  loaded: boolean;
  loading: boolean;
}

export const initialState: CustomerState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(state = initialState, action: CustomersAction): CustomerState {
  switch (action.type) {
    case CustomersActionTypes.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true
      };
    }

    case CustomersActionTypes.LOAD_CUSTOMERS_SUCCESS: {
      const customers = action.payload;

      const entities = customers.reduce((allEntities: { [id: number]: Customer }, customer: Customer) => {
        return {
          ...allEntities,
          [customer.id]: customer
        };
      }, {...state.entities});

      return {
        ...state,
        loading: false,
        loaded: true,
        entities,
      };
    }

    case CustomersActionTypes.LOAD_CUSTOMERS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case CustomersActionTypes.CREATE_CUSTOMER_SUCCESS:
    case CustomersActionTypes.UPDATE_CUSTOMER_SUCCESS: {
      const customer = action.payload;
      const entities = {
        ...state.entities,
        [customer.id]: customer,
      };

      return {
        ...state,
        entities,
      };
    }

    case CustomersActionTypes.REMOVE_CUSTOMER_SUCCESS: {
      const customer = action.payload;

      // desctucturing to remove
      const {[customer.id]: removed, ...entities} = state.entities;

      return {
        ...state,
        entities
      };
    }
  }
  return state;
}

export const getCustomersEntities = (state: CustomerState) => state.entities;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
