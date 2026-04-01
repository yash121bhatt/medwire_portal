import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthdiarylistComponent } from './healthdiarylist.component';

describe('HealthdiarylistComponent', () => {
  let component: HealthdiarylistComponent;
  let fixture: ComponentFixture<HealthdiarylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthdiarylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthdiarylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
