import { createSelector } from '@ngrx/store';

import { Customer } from '../../models/customer.model';
import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromCustomers from '../reducers/customers.reducer';
import * as fromProducts from './products.selectors';

export const selectCustomersState = createSelector(fromFeature.selectUsersState, (state: fromFeature.UsersState) => state.customers);

export const {
  selectIds: selectCustomersIds,
  selectEntities: selectCustomersEntities,
  selectAll: selectAllCustomers,
  selectTotal: selectCustomersTotal,
} = fromCustomers.customerAdapter.getSelectors(selectCustomersState);

export const selectSelectedCustomer = createSelector(selectCustomersEntities, fromRoot.selectRouterState, (entities, router): Customer => {
  return router.state && entities[router.state.params.customerId];
});

export const selectCustomersLoaded = createSelector(selectCustomersState, fromCustomers.selectCustomersLoaded);
export const selectCustomersLoading = createSelector(selectCustomersState, fromCustomers.selectCustomersLoading);

export const selectCustomerVisualised = createSelector(
  selectSelectedCustomer,
  fromProducts.selectProductsEntities,
  fromProducts.selectSelectedProducts,
  (selectedCustomer, productsEntities, selectedProductsIds) => {
    const products = selectedProductsIds.map(id => productsEntities[id]);
    return {...selectedCustomer, products};
  }
);
