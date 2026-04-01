import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreMedicineNotificationComponent } from './pre-medicine-notification.component';

describe('PreMedicineNotificationComponent', () => {
  let component: PreMedicineNotificationComponent;
  let fixture: ComponentFixture<PreMedicineNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreMedicineNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreMedicineNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
