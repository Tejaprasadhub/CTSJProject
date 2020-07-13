import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { Achievements } from 'src/app/cts/shared/models/achievements';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AchievementsService } from 'src/app/cts/shared/services/achievements.service';

@Component({
  selector: 'app-achievements',
  templateUrl: './achievements.component.html',
  styleUrls: ['./achievements.component.scss']
})
export class AchievementsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: Achievements[];
  achievements: Achievements[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  errorMessage:string="";
  successMessage:string="";
  display:boolean=false;
  position: string;

  constructor(private achievementsService: AchievementsService, private router: Router,private route:ActivatedRoute) {
    this.achievements = [];
  }

  public ngOnInit() {
    this.achievementsService.getAchievements();
    this.achievementsService.achievementsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(achievements => {
      this.datasource = achievements;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'date', header: 'Date' },
      { field: 'createddate', header: 'Created Date' },
      { field: 'createdby', header: 'Created By' }
    ];
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.achievements = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  toggleClass($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }

  addNew($event:any){
    this.router.navigate(['add-achievement'], {relativeTo: this.route,queryParams: { type: 'create'}});
  }
  editAchievement():void{
    // this.router.navigateByUrl("Achievements/add-achievement?type=edit&id=1");
    this.router.navigate(['add-achievement'], {relativeTo: this.route,queryParams: { type: 'edit',id:'1'}});
  }
  deleteAchievement():void{
    this.position="top";
    this.display=true;
    this.successMessage="";
  }
  achievementRevoke():void{
    this.display=false;
    this.successMessage="Achievement deleted successfully"
  }

}
