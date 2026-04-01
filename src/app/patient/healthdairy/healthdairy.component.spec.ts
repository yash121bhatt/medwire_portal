import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthdairyComponent } from './healthdairy.component';

describe('HealthdairyComponent', () => {
  let component: HealthdairyComponent;
  let fixture: ComponentFixture<HealthdairyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthdairyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthdairyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
