import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';

import * as fromStore from '../../store';
import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-user-item',
  template: `
    <app-customer-form
      [customer]="customer$ | async"
      [products]="products$ | async"
      (selected)="onSelect($event)"
      (create)="onCreate($event)"
      (update)="onUpdate($event)"
      (remove)="onRemove($event)">
      <app-customer-display
        [customer]="visualise$ | async">
      </app-customer-display>
    </app-customer-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserItemComponent implements OnInit {
  customer$: Observable<Customer>;
  products$: Observable<Product[]>;
  visualise$: Observable<Customer>;

  constructor(private store: Store<fromStore.UsersState>) {
  }

  ngOnInit() {
    this.customer$ = this.store.select(fromStore.selectSelectedCustomer).pipe(
      tap((customer: Customer = null) => {
        // Check if not creating a new customer.
        const customerExists = Boolean(customer && customer.products);
        const products = customerExists ? customer.products.map(product => product.id) : [];
        this.store.dispatch(new fromStore.VisualiseProducts(products));
      })
    );
    this.products$ = this.store.select(fromStore.selectAllProducts);
    this.visualise$ = this.store.select(fromStore.selectCustomerVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseProducts(event));
  }

  onCreate(customer: Customer) {
    this.store.dispatch(new fromStore.CreateCustomer({customer}));
  }

  onUpdate(event: Customer) {
    this.store.dispatch(new fromStore.UpdateCustomer({customer: {id: event.id, changes: event}}));
  }

  onRemove(customer: Customer) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveCustomer({customer}));
    }
  }
}
