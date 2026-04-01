import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenstruelcalenderComponent } from './menstruelcalender.component';

describe('MenstruelcalenderComponent', () => {
  let component: MenstruelcalenderComponent;
  let fixture: ComponentFixture<MenstruelcalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenstruelcalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenstruelcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
