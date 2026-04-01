import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurancedocComponent } from './insurancedoc.component';

describe('InsurancedocComponent', () => {
  let component: InsurancedocComponent;
  let fixture: ComponentFixture<InsurancedocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsurancedocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurancedocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
