import { ChildTwoComponent } from './../child-two/child-two.component';
import { ChildOneComponent } from './../child-one/child-one.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-parents',
  templateUrl: './parents.component.html',
  styleUrls: ['./parents.component.css']
})
export class ParentsComponent implements OnInit {

  title = "Angular communication between components";
  titleClass = 'title is-3 notification is-primary';
  count = 0;
  constructor() { }

  @ViewChild("c1") c1: ChildOneComponent;
  @ViewChild("c2") c2: ChildTwoComponent;

  ngOnInit() {
  }

  /**
   * Make for update count increment
   */
  onClickCount() {
    this.count = this.count + 1;
  }

  /**
   * Output event make for comunication from child one to parent
   * @author  sarawutt.b
   * @param   value as a number of child one emited 
   */
  onChileOneReset(value) {
    this.count = value;
  }

  /**
   * Output event make for comunication from child two to parent
   * @author  sarawutt.b
   * @param   value as a number of child two emited 
   */
  onChildTwoReset(value) {
    this.count = value;
  }

  /**
   * View child make communication from parent to child
   * @author  sarawutt.b
   */
  onViewChild() {
    this.c1.count = 99;
    this.c2.onClickReset2();
  }
}
