import * as ClockActions from './clock.actions';

export interface State {
  time: Date;
}

const initialState: State = {
  time: new Date()
};

export type Action = ClockActions.All;

export function reducer(state = initialState, action: Action = {type: '[Clock] Second', payload: 0}): State {
  const time = new Date(state.time.getTime());

  switch (action.type) {
    case ClockActions.SECOND: {
      time.setSeconds(time.getSeconds() + action.payload);
      return {...state, time};
    }

    case ClockActions.HOUR: {
      time.setHours(time.getHours() + action.payload);
      return {...state, time};
    }

    default: {
      return state;
    }
  }
}
