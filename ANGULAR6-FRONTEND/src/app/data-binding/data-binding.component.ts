import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  //  define for the variable handle form input
  firstName = null;
  dataBinding = 'Angular Data Binding';

  constructor() { }
  ngOnInit() { }

  //Function trigger when text change or press enter key
  changeText(txt) {
    this.firstName = txt.value;
    console.log('text changed to :: ' + txt.value);
  }

  //Function trigger when clicked for the clickMe the button in the form
  clickMe(txt) {
    alert('Hello :: ' + txt.value);
  }

}
