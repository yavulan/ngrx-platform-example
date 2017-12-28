import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {StoreModule} from '@ngrx/store';
import { reducers } from './reducers';
import { ClockComponent } from './clock/clock.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {ClockEffects} from './effects/clock';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent
  ],
  imports: [
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

    EffectsModule.forRoot([
      ClockEffects,
    ]),
    BrowserModule,
    StoreDevtoolsModule.instrument({maxAge: 25}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
