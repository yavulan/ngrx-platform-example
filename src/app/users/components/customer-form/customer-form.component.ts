import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { map } from 'rxjs/operators';

import { Customer } from '../../models/customer.model';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-customer-form',
  template: `
    <form [formGroup]="form">
      <label>
        <h4>Customer name</h4>
        <input
          type="text"
          formControlName="name"
        >
      </label>

      <ng-content></ng-content>

      <label>
        <h4>Select products</h4>
      </label>
      <app-customer-products
        [products]="products"
        formControlName="products">
      </app-customer-products>
      <button
        type="button"
        *ngIf="!exists"
        (click)="createCustomer(form)">
        Create Customer
      </button>
      <button
        type="button"
        *ngIf="exists"
        (click)="updateCustomer(form)">
        Save changes
      </button>
      <button
        type="button"
        *ngIf="exists"
        (click)="removeCustomer(form)">
        Delete Customer
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerFormComponent implements OnChanges {
  exists = false;

  @Input() customer: Customer;
  @Input() products: Product[];

  @Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Customer>();
  @Output() update = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();

  form = this.fb.group({
    name: ['', Validators.required],
    products: [[]],
  });

  constructor(private fb: FormBuilder) {
  }

  get nameControl() {
    return this.form.get('name') as FormControl;
  }

  get nameControlInvalid() {
    return this.nameControl.hasError('required') && this.nameControl.touched;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.customer && this.customer.id) {
      this.exists = true;
      this.form.patchValue(this.customer);
    }
    this.form
      .get('products')
      .valueChanges.pipe(
      map(products => (products as Product[]).map((product: Product) => product.id))
    )
      .subscribe(value => this.selected.emit(value));
  }

  createCustomer(form: FormGroup) {
    const {value, valid} = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateCustomer(form: FormGroup) {
    const {value, valid, touched} = form;
    if (touched && valid) {
      this.update.emit({...this.customer, ...value});
    }
  }

  removeCustomer(form: FormGroup) {
    const {value} = form;
    this.remove.emit({...this.customer, ...value});
  }
}
