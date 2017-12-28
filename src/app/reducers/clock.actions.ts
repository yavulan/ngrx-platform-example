import { Action } from '@ngrx/store';

export const HOUR = '[Clock] Hour';
export const SECOND = '[Clock] Second';

export class Hour implements Action {
  readonly type = HOUR;

  constructor(public payload: number) {}
}

export class Second implements Action {
  readonly type = SECOND;

  constructor(public payload: number) {}
}

export type All
  = Hour
  | Second;
