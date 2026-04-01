import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureMReportComponent } from './procedure-m-report.component';

describe('ProcedureMReportComponent', () => {
  let component: ProcedureMReportComponent;
  let fixture: ComponentFixture<ProcedureMReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureMReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureMReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
