import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmeasureMemberComponent } from './hrmeasure-member.component';

describe('HrmeasureMemberComponent', () => {
  let component: HrmeasureMemberComponent;
  let fixture: ComponentFixture<HrmeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrmeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
