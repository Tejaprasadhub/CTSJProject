import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentlayoutComponent } from './studentlayout.component';

describe('StudentlayoutComponent', () => {
  let component: StudentlayoutComponent;
  let fixture: ComponentFixture<StudentlayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentlayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentlayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
