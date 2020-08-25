import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/cts/app-constants';
import { map, takeUntil } from 'rxjs/operators';
import { RoleAccessService } from 'src/app/cts/shared/services/role-access.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-role-access',
  templateUrl: './role-access.component.html',
  styleUrls: ['./role-access.component.scss']
})
export class RoleAccessComponent implements OnInit {
  users: any;
  rowGroupMetadata: any;
  userFeatures:any;
  private ngUnsubscribe = new Subject();
  constructor(private roleaccessService:RoleAccessService) {
    this.users = [
      {
        "value": 1,
        "label": "Teja"
      },
      {
        "value": 2,
        "label": "Ganesh"
      }
    ];
  }
  ngOnInit(): void {
  }

  dropdownChange(event): void {
    // alert(event.value);
    this.getUserFeatures();
    
  }
  getUserFeatures(){
    this.roleaccessService.UserFeatures()
    .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result =>{  
      this.userFeatures= result;
      console.log(this.userFeatures)
      this.updateRowGroupMetaData();
    })
  }

  onSort() {
    this.updateRowGroupMetaData();
}

updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.userFeatures) {
        for (let i = 0; i < this.userFeatures.length; i++) {
            let rowData = this.userFeatures[i];
            let brand = rowData.featureTitle;
            if (i == 0) {
                this.rowGroupMetadata[brand] = { index: 0, size: 1 };
            }
            else {
                let previousRowData = this.userFeatures[i - 1];
                let previousRowGroup = previousRowData.featureTitle;
                if (brand === previousRowGroup)
                    this.rowGroupMetadata[brand].size++;
                else
                    this.rowGroupMetadata[brand] = { index: i, size: 1 };
            }
        }
    }
}

onSubmit(permissionData){
  console.log(this.userFeatures)
}


}
