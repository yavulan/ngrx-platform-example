import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-customer-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a [routerLink]="['/users', customer.id]">
      <app-customer-display
        [customer]="customer">
      </app-customer-display>
      <h4>{{ customer.name }}</h4>
      <button type="button">
        View Customer
      </button>
    </a>
  `,
})
export class CustomerItemComponent {
  @Input() customer: any;
}
