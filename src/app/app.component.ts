import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/mapTo';
import {Subject} from 'rxjs/Subject';
import {Store} from '@ngrx/store';
import {HOUR, SECOND} from './reducers/clock.actions';
// import {HOUR, SECOND} from "./reducers";
// import {map} from 'rxjs/operators';

interface AppState {
  clock: {
    time: Date
  };
  people: {people: any[]};
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  time;
  people;

  seconds$ = Observable
    .interval(1000)
    .mapTo({type: SECOND, payload: 1});

  click$ = new Subject()
    .map(value => ({type: HOUR, payload: +value}));

  constructor(private store: Store<AppState>) {
    this.time = store.select('clock').select('time');
    this.people = store.select('people').select('people');

    Observable
      .merge(
        this.click$,
        this.seconds$,
      )
      .subscribe(store.dispatch.bind(store));
  }
}
