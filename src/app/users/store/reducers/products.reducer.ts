import { ProductsAction, ProductsActionType } from '../actions/products.action';
import { Product } from '../../models/product.model';

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
        loading: false,
        loaded: false,
      };
    }
    case ProductsActionType.LOAD_PRODUCTS_SUCCESS: {
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

export const getProductsEntities = (state: ProductsState) => state.entities;
export const getProductsLoaded = (state: ProductsState) => state.loaded;
export const getProductsLoading = (state: ProductsState) => state.loading;
export const getSelectedProducts = (state: ProductsState) => state.selectedProducts;
