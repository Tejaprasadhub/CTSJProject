import { Injectable } from '@angular/core';
import { Teachers } from '../models/teachers';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {
 public teachers: Teachers[]= 
  [
    {
      "id": 1,
      "teachername": "Sindhuja",
      "dob": new Date("25/07/1995"),
      "qualification" : "B.ed",
      "email": "chinchilamsindhuja@gmail.com",
      "mobilenumber": "9876543210",
      "image": "asdfg",
      "experience": "2-3",
      "expertise": "english",
      "classes":"5",
      "sections":"A"
    },{
        "id": 2,
        "teachername": "DOlly",
        "dob": new Date("25/07/1995"),
        "qualification" : "B.tech",
        "email": "dolly@gmail.com",
        "mobilenumber": "9876543210",
        "image": "asdfg",
        "experience": "2-3",
        "expertise": "maths",
        "classes":"6",
        "sections":"A"
      },
      {
        "id": 3,
        "teachername": "arthi",
        "dob": new Date("25/07/1995"),
        "qualification" : "B.ed",
        "email": "arthi@gmail.com",
        "mobilenumber": "9876543210",
        "image": "asdfg",
        "experience": "4-5",
        "expertise": "telugu",
        "classes":"10",
        "sections":"C"
      },
  ];

  private teachersJsonData = new BehaviorSubject<any>(null);
  public teachersJson = this.teachersJsonData.asObservable();
  
  constructor() { }
  public  getTeachers() {
  // console.log(this.students)
    this.teachersJsonData.next(this.teachers);    
  }
}
