import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioCartPageComponent } from './radio-cart-page.component';

describe('RadioCartPageComponent', () => {
  let component: RadioCartPageComponent;
  let fixture: ComponentFixture<RadioCartPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioCartPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioCartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
