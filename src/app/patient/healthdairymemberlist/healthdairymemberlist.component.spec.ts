import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthdairymemberlistComponent } from './healthdairymemberlist.component';

describe('HealthdairymemberlistComponent', () => {
  let component: HealthdairymemberlistComponent;
  let fixture: ComponentFixture<HealthdairymemberlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthdairymemberlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthdairymemberlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
