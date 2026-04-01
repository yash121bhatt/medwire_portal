import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBulkReportComponent } from './upload-bulk-report.component';

describe('UploadBulkReportComponent', () => {
  let component: UploadBulkReportComponent;
  let fixture: ComponentFixture<UploadBulkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadBulkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBulkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
