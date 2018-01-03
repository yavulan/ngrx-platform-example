import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import * as customerActions from '../actions/customers.action';
import {map, switchMap, catchError} from 'rxjs/operators';
import * as fromServices from '../../services';
import {of} from 'rxjs/observable/of';

@Injectable()
export class CustomersEffects {
  constructor(private actions$: Actions, private customersService: fromServices.CustomersService) {
  }

  @Effect()
  loadCustomers$ = this.actions$.ofType(customerActions.LOAD_CUSTOMERS)
    .pipe(
      switchMap(() => {
        return this.customersService.getCustomers().pipe(
          map(customers => new customerActions.LoadCustomersSuccess(customers)),
          catchError(error => of(new customerActions.LoadCustomersFail(error)))
        );
      })
    );
}
