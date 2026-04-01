import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentmedilistComponent } from './currentmedilist.component';

describe('CurrentmedilistComponent', () => {
  let component: CurrentmedilistComponent;
  let fixture: ComponentFixture<CurrentmedilistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentmedilistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentmedilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
