import { Injectable } from '@angular/core';
import { Students } from '../models/students';
import { BehaviorSubject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConstants } from '../../app-constants';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private httpClient: HttpClient) { }
  public getStudents(pagingData) {
    // this.branchesJsonData.next(this.branches);
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    var loginUrl: string = AppConstants.Api.AdminApp + "Students/GetStudents"

    return this.httpClient.post
      (loginUrl, pagingData, { headers: headers, withCredentials: true }).pipe(
        map((response: any) => {
          return response;
        }));
  }

  public AEDStudents(pagingData) {
    // this.branchesJsonData.next(this.branches);
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    var loginUrl: string = AppConstants.Api.AdminApp + "Students/AEDStudents"

    return this.httpClient.post
      (loginUrl, pagingData, { headers: headers, withCredentials: true }).pipe(
        map((response: any) => {
          return response;
        }));
  }

  public GetStudentProfile(pagingData) {
    // this.branchesJsonData.next(this.branches);
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    var loginUrl: string = AppConstants.Api.AdminApp + "Students/GetStudentProfile"

    return this.httpClient.post
      (loginUrl, pagingData, { headers: headers, withCredentials: true }).pipe(
        map((response: any) => {
          return response;
        }));
  }

  public GetExamWiseSubjectMarks(pagingData) {
    // this.branchesJsonData.next(this.branches);
    const headers = new HttpHeaders().set("Content-Type", "application/json");

    var loginUrl: string = AppConstants.Api.AdminApp + "Students/GetExamWiseSubjectMarks"

    return this.httpClient.post
      (loginUrl, pagingData, { headers: headers, withCredentials: true }).pipe(
        map((response: any) => {
          return response;
        }));
  }
}
