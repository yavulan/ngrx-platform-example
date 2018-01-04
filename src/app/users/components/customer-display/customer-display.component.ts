import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-customer-display',
  template: `
    <ul>
      <li *ngFor="let product of customer?.products"
      >
        {{product.name}}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerDisplayComponent {
  @Input() customer: Customer;
}
