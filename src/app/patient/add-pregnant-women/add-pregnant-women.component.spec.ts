import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPregnantWomenComponent } from './add-pregnant-women.component';

describe('AddPregnantWomenComponent', () => {
  let component: AddPregnantWomenComponent;
  let fixture: ComponentFixture<AddPregnantWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPregnantWomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPregnantWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
