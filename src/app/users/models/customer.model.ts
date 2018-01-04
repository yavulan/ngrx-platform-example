import { Product } from './product.model';

export interface Customer {
  id?: number;
  name?: string;
  registered?: number;
  products: Array<Product>;
}
