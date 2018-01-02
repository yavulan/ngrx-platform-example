import { ActionReducerMap } from '@ngrx/store';
import * as fromCustomers from './customers.reducer';

export interface UsersState {
  customers: fromCustomers.CustomerState;
}

export const reducers: ActionReducerMap<UsersState> = {
  customers: fromCustomers.reducer
};
