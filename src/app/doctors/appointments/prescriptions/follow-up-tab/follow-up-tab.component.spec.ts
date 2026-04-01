import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpTabComponent } from './follow-up-tab.component';

describe('FollowUpTabComponent', () => {
  let component: FollowUpTabComponent;
  let fixture: ComponentFixture<FollowUpTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowUpTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
