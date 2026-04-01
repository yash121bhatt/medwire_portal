import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookAppointmentMemberComponent } from './book-appointment-member.component';

describe('BookAppointmentMemberComponent', () => {
  let component: BookAppointmentMemberComponent;
  let fixture: ComponentFixture<BookAppointmentMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookAppointmentMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookAppointmentMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
