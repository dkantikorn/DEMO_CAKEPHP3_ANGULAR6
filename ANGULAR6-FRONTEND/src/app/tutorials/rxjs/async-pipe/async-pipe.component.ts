import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, of, Subscription } from 'rxjs';
import { switchMap, map, delay } from 'rxjs/operators'
@Component({
  selector: 'app-async-pipe',
  templateUrl: './async-pipe.component.html',
  styleUrls: ['./async-pipe.component.css']
})
export class AsyncPipeComponent implements OnInit, OnDestroy {

  time$ = interval(1000).pipe(map(val => new Date()));

  cities$ = of([
    { name: 'Los Angeles', population: '3.9 million', elevation: '233′' },
    { name: 'New York', population: '8,4 million', elevation: '33′' },
    { name: 'Chicago', population: '2.7 million', elevation: '594′' },
  ]).pipe(delay(1000));

  word$ = of('Abibliophobia');


  
  time: Date;//Normal subscription
  timeSub: Subscription;//Normal subscription

  constructor() { }

  ngOnInit() {
    //Normal subscription
    this.timeSub = interval(1000)
      .pipe(map(val => new Date()))
      .subscribe(val => this.time = val);
  }

  ngOnDestroy() {
    //Normal subscription
    this.timeSub.unsubscribe();
  }

}
