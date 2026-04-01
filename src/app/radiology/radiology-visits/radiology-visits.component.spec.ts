import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyVisitsComponent } from './radiology-visits.component';

describe('RadiologyVisitsComponent', () => {
  let component: RadiologyVisitsComponent;
  let fixture: ComponentFixture<RadiologyVisitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyVisitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyVisitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
