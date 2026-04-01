import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioUserListComponent } from './radio-user-list.component';

describe('RadioUserListComponent', () => {
  let component: RadioUserListComponent;
  let fixture: ComponentFixture<RadioUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
