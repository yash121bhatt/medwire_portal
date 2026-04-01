import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditHistoryNotepadComponent } from './edit-history-notepad.component';

describe('EditHistoryNotepadComponent', () => {
  let component: EditHistoryNotepadComponent;
  let fixture: ComponentFixture<EditHistoryNotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditHistoryNotepadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHistoryNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
