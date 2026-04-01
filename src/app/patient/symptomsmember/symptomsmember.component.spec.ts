import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomsmemberComponent } from './symptomsmember.component';

describe('SymptomsmemberComponent', () => {
  let component: SymptomsmemberComponent;
  let fixture: ComponentFixture<SymptomsmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SymptomsmemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SymptomsmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
