import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSurgicalHistoryComponent } from './edit-surgical-history.component';

describe('EditSurgicalHistoryComponent', () => {
  let component: EditSurgicalHistoryComponent;
  let fixture: ComponentFixture<EditSurgicalHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSurgicalHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSurgicalHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
