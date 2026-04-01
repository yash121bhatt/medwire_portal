import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDoctorFeesComponent } from './add-doctor-fees.component';

describe('AddDoctorFeesComponent', () => {
  let component: AddDoctorFeesComponent;
  let fixture: ComponentFixture<AddDoctorFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddDoctorFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDoctorFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
