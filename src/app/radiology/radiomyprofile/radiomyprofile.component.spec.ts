import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiomyprofileComponent } from './radiomyprofile.component';

describe('RadiomyprofileComponent', () => {
  let component: RadiomyprofileComponent;
  let fixture: ComponentFixture<RadiomyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiomyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiomyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
