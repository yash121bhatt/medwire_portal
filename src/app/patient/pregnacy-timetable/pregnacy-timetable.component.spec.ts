import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnacyTimetableComponent } from './pregnacy-timetable.component';

describe('PregnacyTimetableComponent', () => {
  let component: PregnacyTimetableComponent;
  let fixture: ComponentFixture<PregnacyTimetableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnacyTimetableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnacyTimetableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
