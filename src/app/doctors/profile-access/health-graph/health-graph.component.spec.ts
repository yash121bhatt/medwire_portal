import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthGraphComponent } from './health-graph.component';

describe('HealthGraphComponent', () => {
  let component: HealthGraphComponent;
  let fixture: ComponentFixture<HealthGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
