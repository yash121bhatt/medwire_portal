import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceMDocComponent } from './insurance-m-doc.component';

describe('InsuranceMDocComponent', () => {
  let component: InsuranceMDocComponent;
  let fixture: ComponentFixture<InsuranceMDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsuranceMDocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceMDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
