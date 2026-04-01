import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoctorFeesComponent } from './edit-doctor-fees.component';

describe('EditDoctorFeesComponent', () => {
  let component: EditDoctorFeesComponent;
  let fixture: ComponentFixture<EditDoctorFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoctorFeesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDoctorFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
