import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnancysymptomcheckComponent } from './pnancysymptomcheck.component';

describe('PnancysymptomcheckComponent', () => {
  let component: PnancysymptomcheckComponent;
  let fixture: ComponentFixture<PnancysymptomcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnancysymptomcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnancysymptomcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
