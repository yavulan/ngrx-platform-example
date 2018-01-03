import {CustomersGuard} from './customers.guard';
import {ProductsGuard} from './products.guard';
import {CustomerExistsGuard} from './customer-exists.guard';

export const guards: any[] = [CustomersGuard, CustomerExistsGuard, ProductsGuard];

export * from './customers.guard';
export * from './customer-exists.guard';
export * from './products.guard';
