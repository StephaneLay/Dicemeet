import { TestBed } from '@angular/core/testing';

import { TraitsService } from './traits-service';

describe('TraitsService', () => {
  let service: TraitsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraitsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
