import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionMReportComponent } from './prescription-m-report.component';

describe('PrescriptionMReportComponent', () => {
  let component: PrescriptionMReportComponent;
  let fixture: ComponentFixture<PrescriptionMReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionMReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionMReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
