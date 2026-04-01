import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryAppointmentsComponent } from './laboratory-appointments.component';

describe('LaboratoryAppointmentsComponent', () => {
  let component: LaboratoryAppointmentsComponent;
  let fixture: ComponentFixture<LaboratoryAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryAppointmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
