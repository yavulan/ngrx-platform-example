import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as customerActions from '../actions/customers.action';
import {map, switchMap, catchError} from 'rxjs/operators';
import * as fromServices from '../../services';
import {of} from 'rxjs/observable/of';
import {Customer} from '../../models/customer.model';

@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions, private customersService: fromServices.CustomersService) {
  }

  @Effect()
  loadCustomers$ = this.actions$.ofType(customerActions.LOAD_CUSTOMERS)
    .pipe(
      switchMap(() => {
        return this.customersService.getCustomers().pipe(
          map((customers: Customer[]) => new customerActions.LoadCustomersSuccess(customers)),
          catchError(error => of(new customerActions.LoadCustomersFail(error)))
        );
      })
    );

  @Effect()
  createCustomer$ = this.actions$.ofType(customerActions.CREATE_CUSTOMER)
    .pipe(
      map((action: customerActions.CreateCustomer) => action.payload),
      switchMap((customer: Customer) => {
        return this.customersService.createCustomer(customer).pipe(
          map((customer: Customer) => new customerActions.CreateCustomerSuccess(customer)),
          catchError(error => of(new customerActions.CreateCustomerFail(error)))
        );
      })
    );

  @Effect()
  updateCustomer$ = this.actions$.ofType(customerActions.UPDATE_CUSTOMER)
    .pipe(
      map((action: customerActions.UpdateCustomer) => action.payload),
      switchMap((customer: Customer) => {
        return this.customersService.updateCustomer(customer).pipe(
          map((customer: Customer) => new customerActions.UpdateCustomerSuccess(customer)),
          catchError(error => of(new customerActions.UpdateCustomerFail(error)))
        );
      })
    );
}
