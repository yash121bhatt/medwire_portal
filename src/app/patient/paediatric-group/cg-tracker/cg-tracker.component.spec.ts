import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CgTrackerComponent } from './cg-tracker.component';

describe('CgTrackerComponent', () => {
  let component: CgTrackerComponent;
  let fixture: ComponentFixture<CgTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CgTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CgTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
