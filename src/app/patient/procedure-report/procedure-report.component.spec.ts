import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureReportComponent } from './procedure-report.component';

describe('ProcedureReportComponent', () => {
  let component: ProcedureReportComponent;
  let fixture: ComponentFixture<ProcedureReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
