import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';

export const selectProductsState = createSelector(
  fromFeature.selectUsersState,
  (state: fromFeature.UsersState) => state.products
);

export const {
  selectIds: selectProductsIds,
  selectEntities: selectProductsEntities,
  selectAll: selectAllProducts,
  selectTotal: selectProductsTotal,
} = fromProducts.productAdapter.getSelectors(selectProductsState);

export const selectProductsLoaded = createSelector(
  selectProductsState,
  fromProducts.selectProductsLoaded
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  fromProducts.selectProductsLoading
);

export const selectSelectedProducts = createSelector(
  selectProductsState,
  fromProducts.selectSelectedProducts
);
