import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionFooterComponent } from './prescription-footer.component';

describe('PrescriptionFooterComponent', () => {
  let component: PrescriptionFooterComponent;
  let fixture: ComponentFixture<PrescriptionFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
