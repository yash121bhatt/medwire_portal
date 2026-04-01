import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionMemberComponent } from './prescription-member.component';

describe('PrescriptionMemberComponent', () => {
  let component: PrescriptionMemberComponent;
  let fixture: ComponentFixture<PrescriptionMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
