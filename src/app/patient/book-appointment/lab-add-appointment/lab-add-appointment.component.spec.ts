import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabAddAppointmentComponent } from './lab-add-appointment.component';

describe('LabAddAppointmentComponent', () => {
  let component: LabAddAppointmentComponent;
  let fixture: ComponentFixture<LabAddAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabAddAppointmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabAddAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
