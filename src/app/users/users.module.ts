import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    ReactiveFormsModule,
    UsersRoutingModule,
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,
    StoreModule.forFeature('users', {}),
  ],
  providers: [...fromServices.services],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class UsersModule { }