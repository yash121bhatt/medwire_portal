import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineNtfctnComponent } from './medicine-ntfctn.component';

describe('MedicineNtfctnComponent', () => {
  let component: MedicineNtfctnComponent;
  let fixture: ComponentFixture<MedicineNtfctnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineNtfctnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicineNtfctnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
