import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHealthdairyHistoryComponent } from './edit-healthdairy-history.component';

describe('EditHealthdairyHistoryComponent', () => {
  let component: EditHealthdairyHistoryComponent;
  let fixture: ComponentFixture<EditHealthdairyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHealthdairyHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHealthdairyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
