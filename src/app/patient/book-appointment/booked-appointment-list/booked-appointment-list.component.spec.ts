import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedAppointmentListComponent } from './booked-appointment-list.component';

describe('BookedAppointmentListComponent', () => {
  let component: BookedAppointmentListComponent;
  let fixture: ComponentFixture<BookedAppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedAppointmentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
