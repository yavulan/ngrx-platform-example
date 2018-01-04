import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-customer-item',
  template: `
    <a [routerLink]="['/users', customer.id]">
      <app-customer-display
        [customer]="customer">
      </app-customer-display>
      <h4>{{customer.name}}</h4>
      <button type="button">
        View Customer
      </button>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerItemComponent {
  @Input() customer: any;
}
