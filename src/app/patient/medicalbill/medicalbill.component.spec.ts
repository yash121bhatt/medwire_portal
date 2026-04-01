import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalbillComponent } from './medicalbill.component';

describe('MedicalbillComponent', () => {
  let component: MedicalbillComponent;
  let fixture: ComponentFixture<MedicalbillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalbillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalbillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
