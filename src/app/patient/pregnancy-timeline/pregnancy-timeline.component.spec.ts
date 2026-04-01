import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnancyTimelineComponent } from './pregnancy-timeline.component';

describe('PregnancyTimelineComponent', () => {
  let component: PregnancyTimelineComponent;
  let fixture: ComponentFixture<PregnancyTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnancyTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnancyTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
