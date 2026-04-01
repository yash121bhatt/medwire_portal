import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryHistoryComponent } from './laboratory-history.component';

describe('LaboratoryHistoryComponent', () => {
  let component: LaboratoryHistoryComponent;
  let fixture: ComponentFixture<LaboratoryHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
