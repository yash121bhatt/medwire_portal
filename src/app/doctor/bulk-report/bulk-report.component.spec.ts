import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkReportComponent } from './bulk-report.component';

describe('BulkReportComponent', () => {
  let component: BulkReportComponent;
  let fixture: ComponentFixture<BulkReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
