import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentThankyouComponent } from './payment-thankyou.component';

describe('PaymentThankyouComponent', () => {
  let component: PaymentThankyouComponent;
  let fixture: ComponentFixture<PaymentThankyouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentThankyouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentThankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
