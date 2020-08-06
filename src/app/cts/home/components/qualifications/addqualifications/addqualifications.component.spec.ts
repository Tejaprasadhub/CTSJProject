import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqualificationsComponent } from './addqualifications.component';

describe('AddqualificationsComponent', () => {
  let component: AddqualificationsComponent;
  let fixture: ComponentFixture<AddqualificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddqualificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqualificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
