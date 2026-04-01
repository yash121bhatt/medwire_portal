import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmeasureMemberComponent } from './osmeasure-member.component';

describe('OsmeasureMemberComponent', () => {
  let component: OsmeasureMemberComponent;
  let fixture: ComponentFixture<OsmeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsmeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
