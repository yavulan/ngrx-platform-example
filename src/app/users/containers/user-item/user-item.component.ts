import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import * as fromStore from '../../store';
import {Customer} from '../../models/customer.model';
import {Product} from '../../models/product.model';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {tap} from "rxjs/operators";

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
})
export class UserItemComponent implements OnInit {
  customer$: Observable<Customer>;
  products$: Observable<Product[]>;
  visualise$: Observable<Customer>;

  constructor(private store: Store<fromStore.UsersState>) {
  }

  ngOnInit() {
    this.store.dispatch(new fromStore.LoadProducts());
    this.customer$ = this.store.select(fromStore.getSelectedCustomer).pipe(
      tap((customer: Customer = null) => {
        // check if not creating a new customer.
        const customerExists = Boolean(customer && customer.products);
        const products = customerExists ? customer.products.map(product => product.id): [];
        this.store.dispatch(new fromStore.VisualiseProducts(products));
      })
    );
    this.products$ = this.store.select(fromStore.getAllProducts);
    this.visualise$ = this.store.select(fromStore.getCustomerVisualised);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseProducts(event));
  }

  onCreate(event: Customer) {
    this.store.dispatch(new fromStore.CreateCustomer(event));
  }

  onUpdate(event: Customer) {
  }

  onRemove(event: Customer) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
    }
  }
}
