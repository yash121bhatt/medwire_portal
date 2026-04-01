import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneTrackerComponent } from './milestone-tracker.component';

describe('MilestoneTrackerComponent', () => {
  let component: MilestoneTrackerComponent;
  let fixture: ComponentFixture<MilestoneTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MilestoneTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
