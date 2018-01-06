import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Customer } from '../../models/customer.model';
import * as fromStore from '../../store';

@Component({
  selector: 'app-users',
  template: `
    <a routerLink="./new">
      New Customer
    </a>
    <div *ngIf="!((customers$ | async)?.length)">
      No customers, add one to get started.
    </div>
    <app-customer-item
      *ngFor="let customer of (customers$ | async)"
      [customer]="customer">
    </app-customer-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private store: Store<fromStore.UsersState>) {
  }

  ngOnInit() {
    this.customers$ = this.store.select<Customer[]>(fromStore.selectAllCustomers);
  }
}
