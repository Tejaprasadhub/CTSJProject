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
     console.log(this.urlPath)

     this.router.navigate([{ outlets: { detail: [this.urlPath] } }], {relativeTo: this.route});

    // this.router.navigate([this.urlPath], {relativeTo: this.route});
    // this.router.navigateByUrl(this.urlPath).then(e => {
    //   if (e) {
    //     console.log("Navigation is successful!");
    //   } else {
    //     console.log("Navigation has failed!");
    //   }
    // });
  }
}
