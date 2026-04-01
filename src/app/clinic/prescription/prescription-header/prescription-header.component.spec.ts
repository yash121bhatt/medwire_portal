import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionHeaderComponent } from './prescription-header.component';

describe('PrescriptionHeaderComponent', () => {
  let component: PrescriptionHeaderComponent;
  let fixture: ComponentFixture<PrescriptionHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
