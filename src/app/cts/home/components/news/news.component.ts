import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LazyLoadEvent, SelectItem } from 'primeng/api/public_api';
import { News } from 'src/app/cts/shared/models/news';
import { NewsService } from 'src/app/cts/shared/services/news.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

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
  branchids: SelectItem[] = [];
//to create Teacher From 
filtersForm: FormGroup;
  constructor(private newsService: NewsService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.news = [];
    this.branchids = [
      { label: 'skota', value: '1' },
      { label: 'boddam', value: '2' }
    ];
  }

  public ngOnInit() {
    this.newsService.getNews();
    this.newsService.newsJson.pipe(takeUntil(this.ngUnsubscribe)).subscribe(news => {
      this.datasource = news;
      this.totalRecords = this.datasource.length;
    });
    this.cols = [
      { field: 'title', header: 'Title' },
      { field: 'description', header: 'Description' },
      { field: 'branchid', header: 'Branch Id' },
      { field: 'createddate', header: 'Created Date' },
      { field: 'createdby', header: 'Created By' }
    ];
    this.loading = true;
     //to create form with validations
     this.createFilterForm();
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
  //Crud events
  addNew($event: any) {
    let id="0";
    this.router.navigate(['add-news'], { relativeTo: this.route, queryParams: { type: window.btoa('create'),id: window.btoa(id) } });
  }
  editNews(id):void{
    this.router.navigate(['add-news'],{relativeTo: this.route,queryParams: { type: window.btoa('edit'), id: window.btoa(id) }});
  }
  viewNews(id):void{
    this.router.navigate(['add-news'],{relativeTo: this.route,queryParams: { type: window.btoa('view'), id: window.btoa(id) }});
  }
  deleteNews(id):void{
    this.position="top";
    this.display=true;
  }
  newsRevoke():void{
    this.display=false;
  }
   //Filters code starts from here
   //Create form method to constuct a form with validations
   createFilterForm() {
    this.filtersForm = this.fb.group({
      'ttitle': new FormControl(''),
      'tbranchid': new FormControl('')
    });
  }

  // Add Teacher method
  filterSubmit(): void {
    console.log(this.filtersForm.value);
  }
  //Reset form method
  resetFilterForm(): void {
    this.filtersForm.reset();
    console.log(this.filtersForm.value);
  }

}

