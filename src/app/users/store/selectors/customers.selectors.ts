import { createSelector } from '@ngrx/store';

import { Customer } from '../../models/customer.model';
import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromCustomers from '../reducers/customers.reducer';
import * as fromProducts from './products.selectors';

export const getCustomersState = createSelector(fromFeature.getUsersState, (state: fromFeature.UsersState) => state.customers);

export const getCustomersEntities = createSelector(getCustomersState, fromCustomers.getCustomersEntities);

export const getSelectedCustomer = createSelector(getCustomersEntities, fromRoot.getRouterState, (entities, router): Customer => {
  return router.state && entities[router.state.params.customerId];
});

export const getAllCustomers = createSelector(getCustomersEntities, (entities) => {
  return Object.keys(entities).map(id => entities[id]);
});
export const getCustomersLoaded = createSelector(getCustomersState, fromCustomers.getCustomersLoaded);
export const getCustomersLoading = createSelector(getCustomersState, fromCustomers.getCustomersLoading);

export const getCustomerVisualised = createSelector(
  getSelectedCustomer,
  fromProducts.getProductsEntities,
  fromProducts.getSelectedProducts,
  (customer, productsEntities, selectedProducts) => {
    const products = selectedProducts.map(id => productsEntities[id]);
    return {...customer, products};
  }
);
