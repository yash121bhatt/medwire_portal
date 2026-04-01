import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffMyprofileComponent } from './staff-myprofile.component';

describe('StaffMyprofileComponent', () => {
  let component: StaffMyprofileComponent;
  let fixture: ComponentFixture<StaffMyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffMyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffMyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
