import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpsubmitComponent } from './otpsubmit.component';

describe('OtpsubmitComponent', () => {
  let component: OtpsubmitComponent;
  let fixture: ComponentFixture<OtpsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtpsubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
