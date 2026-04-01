import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalMBillComponent } from './medical-m-bill.component';

describe('MedicalMBillComponent', () => {
  let component: MedicalMBillComponent;
  let fixture: ComponentFixture<MedicalMBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalMBillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalMBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
