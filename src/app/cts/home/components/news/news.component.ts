import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { News } from 'src/app/cts/shared/models/news';
import { NewsService } from 'src/app/cts/shared/services/news.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  private ngUnsubscribe = new Subject();
  datasource: News[];
  news: News[];
  totalRecords: number;
  cols: any[];
  @ViewChild('myFiltersDiv') myFiltersDiv: ElementRef;
  loading: boolean;
  display:boolean=false;
  position: string;

  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute) {
    this.news = [];
  }

  public ngOnInit() {
    this.newsService.getNews();
    this.newsService.newsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(news => {
      this.datasource = news;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'title', header: 'Name' },
      { field: 'description', header: 'Description' },
      { field: 'branchid', header: 'Branch Id' },
      { field: 'createddate', header: 'Created Date' },
      { field: 'createdby', header: 'Created By' }
    ];
    this.loading = true;
  }

  loadCarsLazy(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.datasource) {
        this.news = this.datasource.slice(event.first, (event.first + event.rows));
        this.loading = false;
      }
    }, 1000);
  }

  toggleNews($event: any) {
    if (this.myFiltersDiv.nativeElement.classList.contains('transform-active'))
      this.myFiltersDiv.nativeElement.classList.remove('transform-active')
    else
      this.myFiltersDiv.nativeElement.classList.add('transform-active')
  }
  addNew($event: any) {
    this.router.navigate(['add-news'], { relativeTo: this.route, queryParams: { type: 'create' } });
  }
  editNews():void{
    // this.router.navigateByUrl("Users/add-teacher?type=edit&id=1");
    this.router.navigate(['add-news'],{relativeTo: this.route,queryParams: { type: 'edit', id: '1' }});
  }
  deleteNews():void{
    this.position="top";
    this.display=true;
  }
  newsRevoke():void{
    this.display=false;
  }
  

}

