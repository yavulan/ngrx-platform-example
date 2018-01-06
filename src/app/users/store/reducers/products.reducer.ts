import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { ProductsAction, ProductsActionType } from '../actions';
import { Product } from '../../models/product.model';

export const productAdapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export interface ProductsState extends EntityState<Product> {
  loaded: boolean;
  loading: boolean;
  selectedProducts: number[];
}

export const initialState: ProductsState = productAdapter.getInitialState({
  loaded: false,
  loading: false,
  selectedProducts: [],
});

export function reducer(state: ProductsState = initialState,
                        action: ProductsAction): ProductsState {
  switch (action.type) {
    case ProductsActionType.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case ProductsActionType.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false,
      };
    }

    case ProductsActionType.LOAD_PRODUCTS_SUCCESS: {
      return productAdapter.addMany(action.payload.products, {
        ...state,
        loaded: true,
        loading: false,
      });
    }

    case ProductsActionType.VISUALISE_PRODUCTS: {
      const selectedProducts = action.payload;

      return {
        ...state,
        selectedProducts,
      };
    }

    default: {
      return state;
    }
  }
}

export const selectProductsLoaded = (state: ProductsState) => state.loaded;
export const selectProductsLoading = (state: ProductsState) => state.loading;
export const selectSelectedProducts = (state: ProductsState) => state.selectedProducts;
