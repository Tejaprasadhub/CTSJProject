import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-studentlayout',
  templateUrl: './studentlayout.component.html',
  styleUrls: ['./studentlayout.component.scss']
})
export class StudentlayoutComponent implements OnInit {
  urlPath : string;
  constructor(private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.urlPath='student-profile';
  }

  routing(studentInfoURL){
    this.urlPath = (studentInfoURL.split(':')[1]).slice(0,-1);
     this.router.navigate([{ outlets: { detail: [this.urlPath] } }], {relativeTo: this.route});   
  }
}
