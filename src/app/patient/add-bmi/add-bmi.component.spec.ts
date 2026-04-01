import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBmiComponent } from './add-bmi.component';

describe('AddBmiComponent', () => {
  let component: AddBmiComponent;
  let fixture: ComponentFixture<AddBmiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBmiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
