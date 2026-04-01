import { TestBed } from '@angular/core/testing';

import { MenstruelcalenderService } from './menstruelcalender.service';

describe('MenstruelcalenderService', () => {
  let service: MenstruelcalenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenstruelcalenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
