import { TestBed } from '@angular/core/testing';

import { LocalisationService } from './localisation';

describe('Localisation', () => {
  let service: LocalisationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalisationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
