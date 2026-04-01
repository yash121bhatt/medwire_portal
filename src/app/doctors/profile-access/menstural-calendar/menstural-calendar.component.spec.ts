import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensturalCalendarComponent } from './menstural-calendar.component';

describe('MensturalCalendarComponent', () => {
  let component: MensturalCalendarComponent;
  let fixture: ComponentFixture<MensturalCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensturalCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensturalCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
