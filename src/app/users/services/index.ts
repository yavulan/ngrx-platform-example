import { CustomersService } from './customers.service';
import { ProductsService } from './products.service';

export const services: any[] = [CustomersService, ProductsService];

export * from './customers.service';
export * from './products.service';
