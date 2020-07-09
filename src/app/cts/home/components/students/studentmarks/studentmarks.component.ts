import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentmarks',
  templateUrl: './studentmarks.component.html',
  styleUrls: ['./studentmarks.component.scss']
})
export class StudentmarksComponent implements OnInit {
  years: any;
  radioButtonValue: string;
  disabled: boolean = true;
  constructor() {
    this.years = [
      { name: '2020', code: '2020' },
      { name: '2019', code: '2019' },
      { name: '2018', code: '2018' },
      { name: '2017', code: '2017' },
      { name: '2016', code: '2016' }
    ];
  }
  ngOnInit(): void {
    this.radioButtonValue = 'P';
  }
  enable() {
    this.disabled = false;
  }
  disable() {
    this.disabled = true
  }



}
