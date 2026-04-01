import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonOneComponent } from './dashboard-person-one.component';

describe('DashboardPersonOneComponent', () => {
  let component: DashboardPersonOneComponent;
  let fixture: ComponentFixture<DashboardPersonOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
