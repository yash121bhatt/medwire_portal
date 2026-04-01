import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioPaymentMethodComponent } from './radio-payment-method.component';

describe('RadioPaymentMethodComponent', () => {
  let component: RadioPaymentMethodComponent;
  let fixture: ComponentFixture<RadioPaymentMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioPaymentMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioPaymentMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
