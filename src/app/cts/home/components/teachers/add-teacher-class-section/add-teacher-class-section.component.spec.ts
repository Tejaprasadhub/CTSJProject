import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeacherClassSectionComponent } from './add-teacher-class-section.component';

describe('AddTeacherClassSectionComponent', () => {
  let component: AddTeacherClassSectionComponent;
  let fixture: ComponentFixture<AddTeacherClassSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTeacherClassSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeacherClassSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
