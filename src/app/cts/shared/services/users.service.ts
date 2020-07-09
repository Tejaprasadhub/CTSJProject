import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsersService {
 public users: Users[]= 
  [
    {
      "id": 1,
      "username": "Sindhuja",
      "usertype" : "Teacher",
      "userstatus": "Active",
      "displayname": "Sindhu"
    },{
        "id": 2,
        "username": "Teja",
        "usertype" : "Admin",
        "userstatus": "Active",
        "displayname": "Teja"
      },
      {
        "id": 3,
        "username": "Chaitanya",
        "usertype" : "DataEntry",
        "userstatus": "Active",
        "displayname": "Chaitu"
      },
      {
      "id": 4,
      "username": "Raju",
      "usertype" : "Teacher",
      "userstatus": "InActive",
      "displayname": "Raj"
    },
    {
    "id": 5,
    "username": "Johnson",
    "usertype" : "Teacher",
    "userstatus": "InActive",
    "displayname": "Jhon"
  },
  ];

  private  usersJsonData = new BehaviorSubject<any>(null);
  public  usersJson = this.usersJsonData.asObservable();
  
  constructor() { }
  public  getUsers() {
  // console.log(this.users)
    this.usersJsonData.next(this.users);    
  }
}
