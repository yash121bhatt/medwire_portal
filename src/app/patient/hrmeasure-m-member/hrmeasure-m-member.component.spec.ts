import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmeasureMMemberComponent } from './hrmeasure-m-member.component';

describe('HrmeasureMMemberComponent', () => {
  let component: HrmeasureMMemberComponent;
  let fixture: ComponentFixture<HrmeasureMMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmeasureMMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmeasureMMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
