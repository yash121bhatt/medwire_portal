import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBodyTestComponent } from './full-body-test.component';

describe('FullBodyTestComponent', () => {
  let component: FullBodyTestComponent;
  let fixture: ComponentFixture<FullBodyTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FullBodyTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBodyTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
