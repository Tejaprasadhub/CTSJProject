import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studentreports',
  templateUrl: './studentreports.component.html',
  styleUrls: ['./studentreports.component.scss']
})
export class StudentreportsComponent implements OnInit {
  years:any;
  constructor() {
    this.years = [
      {name: '2020', code: '2020'},
      {name: '2019', code: '2019'},
      {name: '2018', code: '2018'},
      {name: '2017', code: '2017'},
      {name: '2016', code: '2016'}
  ];
   }

  ngOnInit(): void {
  }

}
