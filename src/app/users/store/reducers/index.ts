import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';
import * as fromCustomers from './customers.reducer';

export interface UsersState {
  customers: fromCustomers.CustomerState;
}

export const reducers: ActionReducerMap<UsersState> = {
  customers: fromCustomers.reducer
};

export const getUsersState = createFeatureSelector<UsersState>('users');

// customers state
export const getCustomersState = createSelector(getUsersState, (state: UsersState) => state.customers);

export const getCustomersEntities = createSelector(getCustomersState, fromCustomers.getCustomersEntities);
export const getAllCustomers = createSelector(getCustomersEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getCustomersLoaded = createSelector(getCustomersState, fromCustomers.getCustomersLoaded);
export const getCustomersLoading = createSelector(getCustomersState, fromCustomers.getCustomersLoading);
