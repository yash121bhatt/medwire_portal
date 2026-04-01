import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinationMReportComponent } from './vacination-m-report.component';

describe('VacinationMReportComponent', () => {
  let component: VacinationMReportComponent;
  let fixture: ComponentFixture<VacinationMReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinationMReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinationMReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
