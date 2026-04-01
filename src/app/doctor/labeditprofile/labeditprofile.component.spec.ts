import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabeditprofileComponent } from './labeditprofile.component';

describe('LabeditprofileComponent', () => {
  let component: LabeditprofileComponent;
  let fixture: ComponentFixture<LabeditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabeditprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabeditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
