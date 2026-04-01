import { TestBed } from '@angular/core/testing';

import { BulkReportService } from './bulk-report.service';

describe('BulkReportService', () => {
  let service: BulkReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
