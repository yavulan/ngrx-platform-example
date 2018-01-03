import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromCustomers from './customers.reducer';
import * as fromProoducts from './products.reducer';

export interface UsersState {
  customers: fromCustomers.CustomerState;
  products: fromProoducts.ProductsState;
}

export const reducers: ActionReducerMap<UsersState> = {
  customers: fromCustomers.reducer,
  products: fromProoducts.reducer,
};

export const getUsersState = createFeatureSelector<UsersState>('users');
