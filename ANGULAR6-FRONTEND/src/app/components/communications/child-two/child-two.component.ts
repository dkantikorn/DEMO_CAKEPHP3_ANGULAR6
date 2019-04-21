import { SharedService } from './../../../_services/shared.service';
import { Component, OnInit, Input, EventEmitter, Output, Inject, forwardRef } from '@angular/core';
import { ParentsComponent } from '../parents/parents.component';

@Component({
  selector: 'app-child-two',
  templateUrl: './child-two.component.html',
  styleUrls: ['./child-two.component.css']
})
export class ChildTwoComponent implements OnInit {

  @Input() count = 0;//with out alias
  @Output() onReset = new EventEmitter<any>();

  constructor(
    @Inject(forwardRef(() => ParentsComponent)) private parent: ParentsComponent,
    private share: SharedService
  ) { }

  ngOnInit() {
  }

  /**
   * 
   * Function update parent property from child
   * @author  sarawutt.b
   */
  onClickReset2() {
    this.onReset.emit(20);
  }

  /**
   * 
   * Function update parent property from child
   * @author  sarawutt.b
   */
  onClickUpdateParent() {
    this.parent.title = "Angular communication between components from child-two component.";
    this.parent.titleClass = "title is-3 notification is-warning";
  }

  /**
   * 
   * Function making update shere variable from service
   * @author  sarawutt.b
   */
  onClickUpdateService() {
    ++this.share.count;
  }
}
