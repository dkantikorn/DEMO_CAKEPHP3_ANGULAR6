import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-ng-if-template',
  templateUrl: './ng-if-template.component.html',
  styleUrls: ['./ng-if-template.component.css']
})
export class NgIfTemplateComponent implements OnInit {

  thenBlock: TemplateRef<any>|null = null;
  show: boolean = true;
 
  @ViewChild('primaryBlock')
  primaryBlock: TemplateRef<any>|null = null;
  @ViewChild('secondaryBlock')
  secondaryBlock: TemplateRef<any>|null = null;
 
  switchPrimary() {
    this.thenBlock = this.thenBlock === this.primaryBlock ? this.secondaryBlock : this.primaryBlock;
  }
  
  constructor() { }

  ngOnInit() {
    this.thenBlock = this.primaryBlock;
  }

}
