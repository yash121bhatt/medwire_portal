import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyHistoryComponent } from './radiology-history.component';

describe('RadiologyHistoryComponent', () => {
  let component: RadiologyHistoryComponent;
  let fixture: ComponentFixture<RadiologyHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
