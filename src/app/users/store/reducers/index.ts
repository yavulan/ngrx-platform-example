import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromCustomers from './customers.reducer';
import * as fromProducts from './products.reducer';

export interface UsersState {
  customers: fromCustomers.CustomerState;
  products: fromProducts.ProductsState;
}

export const reducers: ActionReducerMap<UsersState> = {
  customers: fromCustomers.reducer,
  products: fromProducts.reducer,
};

export const selectUsersState = createFeatureSelector<UsersState>('users');
