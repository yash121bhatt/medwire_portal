import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmeasureMemberComponent } from './bpmeasure-member.component';

describe('BpmeasureMemberComponent', () => {
  let component: BpmeasureMemberComponent;
  let fixture: ComponentFixture<BpmeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
