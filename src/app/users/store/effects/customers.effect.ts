import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as customerActions from '../actions/customers.action';
import {map, switchMap, catchError, tap} from 'rxjs/operators';
import * as fromServices from '../../services';
import * as fromRoot from '../../../store';
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
  createCustomerSuccess$ = this.actions$.ofType(customerActions.CREATE_CUSTOMER_SUCCESS)
    .pipe(
      map((action: customerActions.CreateCustomerSuccess) => action.payload),
      map((customer: Customer) => new fromRoot.Go({
        path: ['/users', customer.id]
      })),
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

  @Effect()
  removeCustomer$ = this.actions$.ofType(customerActions.REMOVE_CUSTOMER)
    .pipe(
      map((action: customerActions.RemoveCustomer) => action.payload),
      switchMap((customer: Customer) => {
        return this.customersService.removeCustomer(customer).pipe(
          map(() => new customerActions.RemoveCustomerSuccess(customer)),
          catchError(error => of(new customerActions.RemoveCustomerFail(error)))
        );
      })
    );

  @Effect()
  handleCustomerSuccess$ = this.actions$.ofType(customerActions.REMOVE_CUSTOMER_SUCCESS, customerActions.UPDATE_CUSTOMER_SUCCESS)
    .pipe(
      map((customer) => new fromRoot.Go({
        path: ['/users']
      })),
    );
}
