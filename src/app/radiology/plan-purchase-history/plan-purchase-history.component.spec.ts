import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanPurchaseHistoryComponent } from './plan-purchase-history.component';

describe('PlanPurchaseHistoryComponent', () => {
  let component: PlanPurchaseHistoryComponent;
  let fixture: ComponentFixture<PlanPurchaseHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanPurchaseHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanPurchaseHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
