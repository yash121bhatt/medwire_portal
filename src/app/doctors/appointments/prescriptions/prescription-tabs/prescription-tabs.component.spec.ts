import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionTabsComponent } from './prescription-tabs.component';

describe('PrescriptionTabsComponent', () => {
  let component: PrescriptionTabsComponent;
  let fixture: ComponentFixture<PrescriptionTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescriptionTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
