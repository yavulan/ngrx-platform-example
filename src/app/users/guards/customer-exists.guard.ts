import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, take, tap, map, switchMap } from 'rxjs/operators';

import { Customer } from '../models/customer.model';

import * as fromStore from '../store';

@Injectable()
export class CustomerExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.UsersState>) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.customerId, 10);
        return this.hasCustomer(id);
      }),
    );
  }

  hasCustomer(id: number): Observable<boolean> {
    return this.store.select(fromStore.getCustomersEntities).pipe(
      map((entities: { [key: number]: Customer }) => Boolean(entities[id])),
      // Unsubscribe automatically.
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getCustomersLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadCustomers());
        }
      }),
      // Waits for loaded become true.
      filter((loaded: boolean) => loaded),
      // Unsubscribe automatically when loaded.
      take(1)
    );
  }
}
