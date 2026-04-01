import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestTestReportMemberComponent } from './latest-test-report-member.component';

describe('LatestTestReportMemberComponent', () => {
  let component: LatestTestReportMemberComponent;
  let fixture: ComponentFixture<LatestTestReportMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestTestReportMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatestTestReportMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
