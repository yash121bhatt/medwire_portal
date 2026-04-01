import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTestReportComponent } from './latest-test-report.component';

describe('LatestTestReportComponent', () => {
  let component: LatestTestReportComponent;
  let fixture: ComponentFixture<LatestTestReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestTestReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
