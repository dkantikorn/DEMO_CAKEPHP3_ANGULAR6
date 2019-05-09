import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'demo-animations-app',
  templateUrl: './demo-animations.component.html',
  styleUrls: ['./demo-animations.component.css'],
  animations: [
    trigger('myTrigger', [
      state('inactive', style({
        display: 'none',
        opacity: 0,
        transform: 'translateX(-100%)'
      })),
      state('active', style({
        display: 'table',
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('inactive => active', animate('200ms ease-in')),
      transition('active => inactive', animate('500ms ease-out'))
    ])
  ]
})
export class DemoAnimationsComponent implements OnInit {

  public mystateVal:string = 'inactive';
  constructor() { }

  ngOnInit() {
  }

  toggleTable(){
    this.mystateVal = this.mystateVal=='active'?'inactive':'active';
  }

}
