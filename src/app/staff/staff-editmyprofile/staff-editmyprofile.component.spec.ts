import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffEditmyprofileComponent } from './staff-editmyprofile.component';

describe('StaffEditmyprofileComponent', () => {
  let component: StaffEditmyprofileComponent;
  let fixture: ComponentFixture<StaffEditmyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffEditmyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffEditmyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
