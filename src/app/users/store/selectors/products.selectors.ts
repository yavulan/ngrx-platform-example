import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProducts from '../reducers/products.reducer';

export const getProductsState = createSelector(
  fromFeature.getUsersState,
  (state: fromFeature.UsersState) => state.products
);

export const getProductsEntities = createSelector(
  getProductsState,
  fromProducts.getProductsEntities
);

export const getAllProducts = createSelector(
  getProductsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[id]);
  }
);

export const getProductsLoaded = createSelector(
  getProductsState,
  fromProducts.getProductsLoaded
);

export const getProductsLoading = createSelector(
  getProductsState,
  fromProducts.getProductsLoading
);

export const getSelectedProducts = createSelector(
  getProductsState,
  fromProducts.getSelectedProducts
);
