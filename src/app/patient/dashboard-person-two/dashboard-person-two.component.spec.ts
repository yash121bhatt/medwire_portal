import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonTwoComponent } from './dashboard-person-two.component';

describe('DashboardPersonTwoComponent', () => {
  let component: DashboardPersonTwoComponent;
  let fixture: ComponentFixture<DashboardPersonTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
