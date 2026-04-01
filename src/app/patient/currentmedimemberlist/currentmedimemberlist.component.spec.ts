import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentmedimemberlistComponent } from './currentmedimemberlist.component';

describe('CurrentmedimemberlistComponent', () => {
  let component: CurrentmedimemberlistComponent;
  let fixture: ComponentFixture<CurrentmedimemberlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentmedimemberlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentmedimemberlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
