import { TestBed } from '@angular/core/testing';

import { StudentreportsService } from './studentreports.service';

describe('StudentreportsService', () => {
  let service: StudentreportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentreportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
