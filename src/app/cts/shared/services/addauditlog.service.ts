import { Injectable } from '@angular/core';
import { Addauditlog } from '../models/addauditlog';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AddauditlogService {
  public teachers: Addauditlog[]= 
  [
    {
      "id": 1,
      "date":new Date("25/07/1995"),
      "fieldname" :"Login",
      "action": "Insert",
      "oldvalue": "20",
      "newvalue": "30",
      "user": "Teacher"
    }
  ];
  private addauditlogJsonData = new BehaviorSubject<any>(null);
  public addauditlogJson = this.addauditlogJsonData.asObservable();
  
  constructor() { }
  public  getAddauditlog() {
  // console.log(this.students)
    this.addauditlogJsonData.next(this.teachers);    
  }
 
}
