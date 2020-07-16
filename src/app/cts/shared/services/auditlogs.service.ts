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
      "table": "Teachers"
    },
    {
      "id": 2,
      "table": "Users"
    },
    {
      "id": 3,
      "table": "Students"    
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
