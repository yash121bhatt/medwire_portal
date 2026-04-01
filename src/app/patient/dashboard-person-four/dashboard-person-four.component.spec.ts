import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPersonFourComponent } from './dashboard-person-four.component';

describe('DashboardPersonFourComponent', () => {
  let component: DashboardPersonFourComponent;
  let fixture: ComponentFixture<DashboardPersonFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPersonFourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPersonFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
