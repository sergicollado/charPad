import { TestBed } from '@angular/core/testing';

import { PartyStorageService } from './party-storage.service';

describe('PartyStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PartyStorageService = TestBed.get(PartyStorageService);
    expect(service).toBeTruthy();
  });
});
