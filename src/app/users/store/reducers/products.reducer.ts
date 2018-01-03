import * as fromProducts from '../actions/products.action';
import {Product} from '../../models/product.model';

export interface ProductsState {
  entities: { [id: number]: Product };
  loaded: boolean;
  loading: boolean;
  selectedProducts: number[];
}

export const initialState: ProductsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedProducts: [],
};

export function reducer(state: ProductsState = initialState,
                        action: fromProducts.ProductsAction): ProductsState {
  switch (action.type) {
    case fromProducts.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }
    case fromProducts.LOAD_PRODUCTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
    case fromProducts.LOAD_PRODUCTS_SUCCESS: {
      const products = action.payload;

      const entities = products.reduce((allEntities: { [id: number]: Product }, product: Product) => {
        return {
          ...allEntities,
          [product.id]: product
        };
      }, {...state.entities});

      return {
        ...state,
        loaded: true,
        loading: false,
        entities
      };
    }
    case fromProducts.VISUALISE_PRODUCTS: {
      const selectedProducts = action.payload;

      return {
        ...state,
        selectedProducts,
      };
    }
  }

  return state;
}

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
export const getProductsLoading = (state: ProductsState) => state.loading;
export const getSelectedProducts = (state: ProductsState) => state.selectedProducts;