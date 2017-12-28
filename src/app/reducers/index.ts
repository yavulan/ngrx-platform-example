import * as fromClock from './clock.reducer';
import {ActionReducerMap} from '@ngrx/store';

export interface State {
  clock: fromClock.State;
}

export const reducers: ActionReducerMap<State> = {
  clock: fromClock.reducer,
}
