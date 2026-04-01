import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InslightMonitoringListComponent } from './inslight-monitoring-list.component';

describe('InslightMonitoringListComponent', () => {
  let component: InslightMonitoringListComponent;
  let fixture: ComponentFixture<InslightMonitoringListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InslightMonitoringListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InslightMonitoringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
