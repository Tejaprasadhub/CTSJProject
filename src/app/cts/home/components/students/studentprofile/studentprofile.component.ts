import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/cts/shared/services/dropdown.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-studentprofile',
  templateUrl: './studentprofile.component.html',
  styleUrls: ['./studentprofile.component.scss']
})
export class StudentprofileComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  expertise: any[];
  constructor(private dropdownService: DropdownService) { 
        //Get Dropdowns API call
        var dropdowns = ["subjects"];
        this.dropdownService.getDropdowns(dropdowns)
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          if (result.success) {
           this.expertise = result.data.subjects;
          }
        });  
  }

  ngOnInit(): void {
  }

}
