import { TestBed } from '@angular/core/testing';

import { UploadBulkReportService } from './upload-bulk-report.service';

describe('UploadBulkReportService', () => {
  let service: UploadBulkReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadBulkReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
