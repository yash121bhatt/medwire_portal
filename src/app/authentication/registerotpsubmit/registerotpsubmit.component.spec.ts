import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterotpsubmitComponent } from './registerotpsubmit.component';

describe('RegisterotpsubmitComponent', () => {
  let component: RegisterotpsubmitComponent;
  let fixture: ComponentFixture<RegisterotpsubmitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterotpsubmitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterotpsubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
