import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryNotepadComponent } from './history-notepad.component';

describe('HistoryNotepadComponent', () => {
  let component: HistoryNotepadComponent;
  let fixture: ComponentFixture<HistoryNotepadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryNotepadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryNotepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
