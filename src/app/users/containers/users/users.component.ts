import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Customer} from '../../models/customer.model';

import * as fromStore from '../../store';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-users',
  template: `
    <a routerLink="./new">
      New Customer
    </a>
    <div *ngIf="!((customers$ | async)?.length)">
      No pizzas, add one to get started.
    </div>
    <app-customer-item
      *ngFor="let customer of (customers$ | async)"
      [customer]="customer">
    </app-customer-item>
  `,
})
export class UsersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private store: Store<fromStore.UsersState>) {
  }

  ngOnInit() {
    this.customers$ = this.store.select<Customer[]>(fromStore.getAllCustomers);
    this.store.dispatch(new fromStore.LoadCustomers);
  }
}
