import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempmeasureMMemberComponent } from './tempmeasure-m-member.component';

describe('TempmeasureMMemberComponent', () => {
  let component: TempmeasureMMemberComponent;
  let fixture: ComponentFixture<TempmeasureMMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TempmeasureMMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TempmeasureMMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
