import { SharedService } from './../../../_services/shared.service';
import { ParentsComponent } from './../parents/parents.component';
import { Component, OnInit, Input, Output, EventEmitter, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.css']
})
export class ChildOneComponent implements OnInit {

  @Input("count_child_1") count = 0;//with count_child_1 alias
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
  onClickReset1() {
    this.onReset.emit(0);
  }

  /**
   * 
   * Function update parent property from child
   * @author  sarawutt.b
   */
  onClickUpdateParant() {
    this.parent.title = "Angular communication between components from child-one component.";
    this.parent.titleClass = "title is-3 notification is-info";
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
