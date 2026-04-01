import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsmeasureMMemberComponent } from './osmeasure-m-member.component';

describe('OsmeasureMMemberComponent', () => {
  let component: OsmeasureMMemberComponent;
  let fixture: ComponentFixture<OsmeasureMMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OsmeasureMMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OsmeasureMMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
