import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonThreeComponent } from './dashboard-person-three.component';

describe('DashboardPersonThreeComponent', () => {
  let component: DashboardPersonThreeComponent;
  let fixture: ComponentFixture<DashboardPersonThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
