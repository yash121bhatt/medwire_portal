import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicEditmyprofileComponent } from './clinic-editmyprofile.component';

describe('ClinicEditmyprofileComponent', () => {
  let component: ClinicEditmyprofileComponent;
  let fixture: ComponentFixture<ClinicEditmyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicEditmyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicEditmyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
