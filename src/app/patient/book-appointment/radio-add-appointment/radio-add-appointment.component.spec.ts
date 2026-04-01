import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAddAppointmentComponent } from './radio-add-appointment.component';

describe('RadioAddAppointmentComponent', () => {
  let component: RadioAddAppointmentComponent;
  let fixture: ComponentFixture<RadioAddAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioAddAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
