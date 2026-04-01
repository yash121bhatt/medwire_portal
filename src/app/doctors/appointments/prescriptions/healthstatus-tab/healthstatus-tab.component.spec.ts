import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthstatusTabComponent } from './healthstatus-tab.component';

describe('HealthstatusTabComponent', () => {
  let component: HealthstatusTabComponent;
  let fixture: ComponentFixture<HealthstatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthstatusTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthstatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
