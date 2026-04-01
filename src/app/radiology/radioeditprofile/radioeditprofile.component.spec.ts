import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioeditprofileComponent } from './radioeditprofile.component';

describe('RadioeditprofileComponent', () => {
  let component: RadioeditprofileComponent;
  let fixture: ComponentFixture<RadioeditprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioeditprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioeditprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
