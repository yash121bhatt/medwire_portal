import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacinationReportComponent } from './vacination-report.component';

describe('VacinationReportComponent', () => {
  let component: VacinationReportComponent;
  let fixture: ComponentFixture<VacinationReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VacinationReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinationReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
