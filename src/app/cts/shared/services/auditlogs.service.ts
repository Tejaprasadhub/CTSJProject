import { Injectable } from '@angular/core';
import { Auditlogs } from '../models/auditlogs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuditlogsService {
 public auditlogs: Auditlogs[]= 
  [
    {
      "id": 1,
      "firstname": "aBehara",
      "middlename": "Teja",
      "lastname": "Prasad",
      "gender": "Male",
      "dob": new Date("17/06/1995"),
      "joinDate": new Date("17/06/1995"),
      "email": "tejaprasadbehara@gmail.com",
      "image": "gsdgsdg",
      "classs": 1,
      "section": "A"
    },
    {
      "id": 2,
      "firstname": "Behara2",
      "middlename": "Teja2",
      "lastname": "Prasad2",
      "gender": "Male2",
      "dob": new Date("17/06/1995"),
      "joinDate": new Date("17/06/1995"),
      "email": "tejaprasadbehara2@gmail.com",
      "image": "gsdgsdg2",
      "classs": 1,
      "section": "A"
    },
    {
      "id": 3,
      "firstname": "Behara2",
      "middlename": "Teja2",
      "lastname": "Prasad2",
      "gender": "Male2",
      "dob": new Date("17/06/1995"),
      "joinDate": new Date("17/06/1995"),
      "email": "tejaprasadbehara2@gmail.com",
      "image": "gsdgsdg2",
      "classs": 1,
      "section": "A"
    }
    
  ];

  private auditlogsJsonData = new BehaviorSubject<any>(null);
  public auditlogsJson = this.auditlogsJsonData.asObservable();
  
  constructor() { }
  public  getAuditlogs() {
  // console.log(this.Auditlogs)
    this.auditlogsJsonData.next(this.auditlogs);    
  }
}
