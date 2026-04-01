import { TestBed } from '@angular/core/testing';

import { PatientdataService } from './patientdata.service';

describe('PatientdataService', () => {
  let service: PatientdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
