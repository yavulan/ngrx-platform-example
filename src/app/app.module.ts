import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { AppComponent } from './app.component';
import { CustomSerializer, effects, reducers } from './store';
import { environment } from '../environments/environment';

// Routes.
export const ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'users'},
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    environment.production ? [] : StoreDevtoolsModule.instrument(),
  ],
  providers: [
    {provide: RouterStateSerializer, useClass: CustomSerializer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// TODO: metareducers
// TODO: @ngrx/entity
