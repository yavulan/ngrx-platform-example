import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Customer} from '../../models/customer.model';
import {CustomersService} from '../../services/customers.service';

@Component({
  selector: 'app-users',
  template: `
    <a routerLink="./new">
      New Customer
    </a>
    <div *ngIf="!((customers)?.length)">
      No pizzas, add one to get started.
    </div>
    <app-customer-item
      *ngFor="let customer of (customers)"
      [customer]="customer">
    </app-customer-item>
  `,
})
export class UsersComponent implements OnInit {
  customers: Customer[];

  constructor(private customersService: CustomersService) {
  }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(customers => {
      this.customers = customers;
    });
  }
}
