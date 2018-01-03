import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {RouterModule, Routes} from '@angular/router';
import {reducers, effects, CustomSerializer} from './store';
import {StoreRouterConnectingModule, RouterStateSerializer} from '@ngrx/router-store';

// routes
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
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot(
      reducers,
      // {
      //   initialState: {
      //     auth: {
      //       loggedIn: true
      //     }
      //   }
      // }
      ),

    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule,
    BrowserModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
  bootstrap: [AppComponent]
})
export class AppModule { }
