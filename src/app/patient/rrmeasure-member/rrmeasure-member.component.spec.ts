import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrmeasureMemberComponent } from './rrmeasure-member.component';

describe('RrmeasureMemberComponent', () => {
  let component: RrmeasureMemberComponent;
  let fixture: ComponentFixture<RrmeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrmeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrmeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
