import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewBabyComponent } from './add-new-baby.component';

describe('AddNewBabyComponent', () => {
  let component: AddNewBabyComponent;
  let fixture: ComponentFixture<AddNewBabyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewBabyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewBabyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
