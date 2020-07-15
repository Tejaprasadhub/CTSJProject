import { TestBed } from '@angular/core/testing';

import { AddauditlogService } from './addauditlog.service';

describe('AddauditlogService', () => {
  let service: AddauditlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddauditlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
