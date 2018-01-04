export interface Product {
  id?: number;
  name?: string;

  // Index signature, all explicit members must also conform to that index signature.
  [key: string]: any;
}
