import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheduleManageComponent } from './shedule-manage.component';

describe('SheduleManageComponent', () => {
  let component: SheduleManageComponent;
  let fixture: ComponentFixture<SheduleManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SheduleManageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SheduleManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
