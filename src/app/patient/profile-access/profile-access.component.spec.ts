import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAccessComponent } from './profile-access.component';

describe('ProfileAccessComponent', () => {
  let component: ProfileAccessComponent;
  let fixture: ComponentFixture<ProfileAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
