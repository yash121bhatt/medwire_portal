import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightMonitoringListComponent } from './insight-monitoring-list.component';

describe('InsightMonitoringListComponent', () => {
  let component: InsightMonitoringListComponent;
  let fixture: ComponentFixture<InsightMonitoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsightMonitoringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsightMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
