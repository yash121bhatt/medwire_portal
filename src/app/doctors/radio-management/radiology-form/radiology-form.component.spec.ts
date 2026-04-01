import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyFormComponent } from './radiology-form.component';

describe('RadiologyFormComponent', () => {
  let component: RadiologyFormComponent;
  let fixture: ComponentFixture<RadiologyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
