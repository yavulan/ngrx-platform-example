import {
  Component,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Product} from '../../models/product.model';

const PIZZA_TOPPINGS_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CustomerProductsComponent),
  multi: true,
};

@Component({
  selector: 'app-customer-products',
  providers: [PIZZA_TOPPINGS_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      *ngFor="let product of products;"
      (click)="selectProduct(product)"
      [class.active]="existsInProducts(product)">
      {{ product.name }}
    </div>`,
})
export class CustomerProductsComponent implements ControlValueAccessor {
  @Input() products: Product[] = [];

  value: Product[] = [];

  private onTouch: Function;
  private onModelChange: Function;

  registerOnChange(fn: Function) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }

  writeValue(value: Product[]) {
    this.value = value;
  }

  selectProduct(product: Product) {
    if (this.existsInProducts(product)) {
      this.value = this.value.filter(item => item.id !== product.id);
    } else {
      this.value = [...this.value, product];
    }
    this.onTouch();
    this.onModelChange(this.value);
  }

  existsInProducts(product: Product) {
    return this.value.some(val => val.id === product.id);
  }
}
