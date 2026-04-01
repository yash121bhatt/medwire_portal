import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLaborateryComponent } from './add-laboratery.component';

describe('AddLaborateryComponent', () => {
  let component: AddLaborateryComponent;
  let fixture: ComponentFixture<AddLaborateryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLaborateryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLaborateryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
