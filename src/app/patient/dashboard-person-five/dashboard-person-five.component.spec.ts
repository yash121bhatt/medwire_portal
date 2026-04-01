import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonFiveComponent } from './dashboard-person-five.component';

describe('DashboardPersonFiveComponent', () => {
  let component: DashboardPersonFiveComponent;
  let fixture: ComponentFixture<DashboardPersonFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonFiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
