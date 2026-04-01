import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrmeasureMMemberComponent } from './rrmeasure-m-member.component';

describe('RrmeasureMMemberComponent', () => {
  let component: RrmeasureMMemberComponent;
  let fixture: ComponentFixture<RrmeasureMMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RrmeasureMMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RrmeasureMMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
