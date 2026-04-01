import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempmeasureMemberComponent } from './tempmeasure-member.component';

describe('TempmeasureMemberComponent', () => {
  let component: TempmeasureMemberComponent;
  let fixture: ComponentFixture<TempmeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempmeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempmeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
