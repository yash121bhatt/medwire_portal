import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicMyprofileComponent } from './clinic-myprofile.component';

describe('ClinicMyprofileComponent', () => {
  let component: ClinicMyprofileComponent;
  let fixture: ComponentFixture<ClinicMyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicMyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
