import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { UsersRoutingModule } from './users-routing.module';

// components
import * as fromComponents from './components';

// containers
import * as fromContainers from './containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature('users', reducers),
    EffectsModule.forFeature(effects),
    UsersRoutingModule,
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components],
})
export class UsersModule { }
