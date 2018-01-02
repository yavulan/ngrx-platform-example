import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Customer} from '../../models/customer.model';
import {ProductsService} from '../../services/products.service';
import {CustomersService} from '../../services/customers.service';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-user-item',
  template: `
    <app-customer-form
      [customer]="customer"
      [products]="products"
      (selected)="onSelect($event)"
      (create)="onCreate($event)"
      (update)="onUpdate($event)"
      (remove)="onRemove($event)">
      <app-customer-display
        [customer]="visualise">
      </app-customer-display>
    </app-customer-form>
  `,
})
export class UserItemComponent implements OnInit {
  customer: Customer;
  visualise: Customer;
  products: Product[];

  constructor(private customersService: CustomersService,
              private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(customers => {
      const param = this.route.snapshot.params.id;
      let pizza;
      if (param === 'new') {
        pizza = {};
      } else {
        pizza = customers.find(customer => customer.id === parseInt(param, 10));
      }
      this.customer = pizza;
      this.productsService.getProducts().subscribe(toppings => {
        this.products = toppings;
        this.onSelect(toppings.map(topping => topping.id));
      });
    });
  }

  onSelect(event: number[]) {
    let toppings;
    if (this.products && this.products.length) {
      toppings = event.map(id =>
        this.products.find(topping => topping.id === id)
      );
    } else {
      toppings = this.customer.products;
    }
    this.visualise = {...this.customer, toppings};
  }

  onCreate(event: Customer) {
    this.customersService.createCustomer(event).subscribe(customer => {
      this.router.navigate([`/products/${customer.id}`]);
    });
  }

  onUpdate(event: Customer) {
    this.customersService.updateCustomer(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Customer) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.customersService.removeCustomer(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}
