import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DischargeMSummaryComponent } from './discharge-m-summary.component';

describe('DischargeMSummaryComponent', () => {
  let component: DischargeMSummaryComponent;
  let fixture: ComponentFixture<DischargeMSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DischargeMSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DischargeMSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
