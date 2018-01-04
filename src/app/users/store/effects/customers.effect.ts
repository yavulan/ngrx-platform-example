import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../store';
import * as fromServices from '../../services';
import * as customerActions from '../actions/customers.action';
import { CustomersActionTypes } from '../actions/customers.action';

@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions,
              private customersService: fromServices.CustomersService) {
  }

  @Effect()
  loadCustomers$ = this.actions$.pipe(
    ofType<customerActions.LoadCustomers>(CustomersActionTypes.LOAD_CUSTOMERS),
    switchMap(() => {
      return this.customersService.getCustomers().pipe(
        map(customers => new customerActions.LoadCustomersSuccess(customers)),
        catchError(error => of(new customerActions.LoadCustomersFail(error)))
      );
    })
  );

  @Effect()
  createCustomer$ = this.actions$.pipe(
    ofType<customerActions.CreateCustomer>(CustomersActionTypes.CREATE_CUSTOMER),
    map(action => action.payload),
    switchMap(customer => {
      return this.customersService.createCustomer(customer).pipe(
        map(createdCustomer => new customerActions.CreateCustomerSuccess(createdCustomer)),
        catchError(error => of(new customerActions.CreateCustomerFail(error)))
      );
    })
  );

  @Effect()
  createCustomerSuccess$ = this.actions$.pipe(
    ofType<customerActions.CreateCustomerSuccess>(CustomersActionTypes.CREATE_CUSTOMER_SUCCESS),
    map(action => action.payload),
    map(customer => new fromRoot.Go({
      path: ['/users', customer.id]
    })),
  );

  @Effect()
  updateCustomer$ = this.actions$.pipe(
    ofType<customerActions.UpdateCustomer>(CustomersActionTypes.UPDATE_CUSTOMER),
    map(action => action.payload),
    switchMap(customer => {
      return this.customersService.updateCustomer(customer).pipe(
        map(updatedCustomer => new customerActions.UpdateCustomerSuccess(updatedCustomer)),
        catchError(error => of(new customerActions.UpdateCustomerFail(error)))
      );
    })
  );

  @Effect()
  removeCustomer$ = this.actions$.pipe(
    ofType<customerActions.RemoveCustomer>(CustomersActionTypes.REMOVE_CUSTOMER),
    map(action => action.payload),
    switchMap(customer => {
      return this.customersService.removeCustomer(customer).pipe(
        map(() => new customerActions.RemoveCustomerSuccess(customer)),
        catchError(error => of(new customerActions.RemoveCustomerFail(error)))
      );
    })
  );

  @Effect()
  handleCustomerSuccess$ = this.actions$.pipe(
    ofType<customerActions.RemoveCustomerSuccess | customerActions.UpdateCustomerSuccess>
    (CustomersActionTypes.REMOVE_CUSTOMER_SUCCESS, CustomersActionTypes.UPDATE_CUSTOMER_SUCCESS),
    map(customer => new fromRoot.Go({
      path: ['/users'],
    }))
  );
}
