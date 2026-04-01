import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmeasureMMemberComponent } from './bpmeasure-m-member.component';

describe('BpmeasureMMemberComponent', () => {
  let component: BpmeasureMMemberComponent;
  let fixture: ComponentFixture<BpmeasureMMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BpmeasureMMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BpmeasureMMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
