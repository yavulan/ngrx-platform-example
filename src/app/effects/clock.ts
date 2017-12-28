import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import * as fromClock from '../reducers/clock.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class ClockEffects {
  @Effect() authActions$: Observable<Action> = this.actions$
    .ofType<fromClock.Second | fromClock.Hour>(fromClock.HOUR)
    .pipe(
      tap(action => {
        console.log(action);
      })
    );

  constructor(private actions$: Actions) {
  }
}
