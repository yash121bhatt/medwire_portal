import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientHealthstatusComponent } from './patient-healthstatus.component';

describe('PatientHealthstatusComponent', () => {
  let component: PatientHealthstatusComponent;
  let fixture: ComponentFixture<PatientHealthstatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientHealthstatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientHealthstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
