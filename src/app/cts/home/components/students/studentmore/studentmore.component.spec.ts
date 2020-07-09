import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentmoreComponent } from './studentmore.component';

describe('StudentmoreComponent', () => {
  let component: StudentmoreComponent;
  let fixture: ComponentFixture<StudentmoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentmoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentmoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
