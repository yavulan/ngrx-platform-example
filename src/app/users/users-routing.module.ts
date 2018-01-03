import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    canActivate: [fromGuards.CustomersGuard],
    component: fromContainers.UsersComponent,
  },
  {
    path: 'new',
    canActivate: [fromGuards.CustomersGuard, fromGuards.ProductsGuard],
    component: fromContainers.UserItemComponent,
  },
  {
    path: ':customerId',
    canActivate: [fromGuards.CustomerExistsGuard, fromGuards.ProductsGuard],
    component: fromContainers.UserItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
