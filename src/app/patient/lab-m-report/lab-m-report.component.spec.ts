import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabMReportComponent } from './lab-m-report.component';

describe('LabMReportComponent', () => {
  let component: LabMReportComponent;
  let fixture: ComponentFixture<LabMReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabMReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabMReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
