import { TestBed } from '@angular/core/testing';

import { BlingService } from './bling.service';

describe('BlingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlingService = TestBed.get(BlingService);
    expect(service).toBeTruthy();
  });
});
