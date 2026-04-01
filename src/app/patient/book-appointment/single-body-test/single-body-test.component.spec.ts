import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBodyTestComponent } from './single-body-test.component';

describe('SingleBodyTestComponent', () => {
  let component: SingleBodyTestComponent;
  let fixture: ComponentFixture<SingleBodyTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBodyTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBodyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
