import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboraroryFormComponent } from './laborarory-form.component';

describe('LaboraroryFormComponent', () => {
  let component: LaboraroryFormComponent;
  let fixture: ComponentFixture<LaboraroryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboraroryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboraroryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
