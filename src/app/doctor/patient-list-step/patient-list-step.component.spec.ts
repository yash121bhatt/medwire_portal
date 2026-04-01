import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientListStepComponent } from './patient-list-step.component';

describe('PatientListStepComponent', () => {
  let component: PatientListStepComponent;
  let fixture: ComponentFixture<PatientListStepComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientListStepComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientListStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
