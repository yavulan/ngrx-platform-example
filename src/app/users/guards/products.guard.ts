import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { catchError, filter, switchMap, take, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

@Injectable()
export class ProductsGuard implements CanActivate {
  constructor(private store: Store<fromStore.UsersState>) {
  }

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.selectProductsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadProducts());
        }
      }),
      // Waits for loaded become true
      filter((loaded: boolean) => loaded),
      // Unsubscribe automatically when loaded
      take(1)
    );
  }
}
