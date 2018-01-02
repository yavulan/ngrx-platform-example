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
    path: ':id',
    component: fromContainers.UserItemComponent,
  },
  {
    path: 'new',
    component: fromContainers.UserItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
