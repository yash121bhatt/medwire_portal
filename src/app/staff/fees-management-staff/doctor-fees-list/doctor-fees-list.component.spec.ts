import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorFeesListComponent } from './doctor-fees-list.component';

describe('DoctorFeesListComponent', () => {
  let component: DoctorFeesListComponent;
  let fixture: ComponentFixture<DoctorFeesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorFeesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorFeesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
