import { TestBed } from '@angular/core/testing';

import { SpendingApiService } from './spending-api.service';

describe('SpendingApiService', () => {
  let service: SpendingApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendingApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
