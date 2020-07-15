import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAuditlogComponent } from './add-auditlog.component';

describe('AddAuditlogComponent', () => {
  let component: AddAuditlogComponent;
  let fixture: ComponentFixture<AddAuditlogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAuditlogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
