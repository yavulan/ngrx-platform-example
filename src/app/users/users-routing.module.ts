import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// containers
import * as fromContainers from './containers';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromContainers.UsersComponent,
  },
  {
    path: 'new',
    component: fromContainers.UserItemComponent,
  },
  {
    path: ':customerId',
    component: fromContainers.UserItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
