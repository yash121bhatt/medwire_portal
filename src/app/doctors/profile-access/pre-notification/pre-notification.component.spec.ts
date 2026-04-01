import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreNotificationComponent } from './pre-notification.component';

describe('PreNotificationComponent', () => {
  let component: PreNotificationComponent;
  let fixture: ComponentFixture<PreNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
