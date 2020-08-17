import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { StudentreportsService } from 'src/app/cts/shared/services/studentreports.service';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Studentreports } from 'src/app/cts/shared/models/studentreports';



@Component({
  selector: 'app-studentreports',
  templateUrl: './studentreports.component.html',
  styleUrls: ['./studentreports.component.scss']
})
export class StudentreportsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  studentreports: Studentreports[];
  years: any;
  exams:any;
  cols: any[];
  datasource: Studentreports[];
  totalRecords: number;
  loading: boolean;
  constructor(private fb: FormBuilder,private studentreportsService: StudentreportsService) {
    this.years = [
      { label: '1st Class', value: '1' },
      { label: '2nd Class', value: '2' },
      { label: '3rd Class', value: '3' }
    ];

    this.exams=[
      {label:"Exam1", value:"1"},
      {label:"Exam2", value:"2"},
      {label:"Exam3", value:"3"}
    ]
   }

  ngOnInit(): void {
    this.studentreportsService.getStudentreports();
    this.studentreportsService.studentreportsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(Studentreports => {
      this.datasource = Studentreports;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'subject', header: 'Subject' },
      { field: 'marksobtained', header: 'Marks Obtained' },
      { field: 'totalmarks', header: 'Total Marks' },
      { field: 'status', header: 'Status' }
    ];    
    this.loading = true;
  }
}
