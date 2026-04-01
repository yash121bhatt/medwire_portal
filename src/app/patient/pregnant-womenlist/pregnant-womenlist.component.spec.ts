import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantWomenlistComponent } from './pregnant-womenlist.component';

describe('PregnantWomenlistComponent', () => {
  let component: PregnantWomenlistComponent;
  let fixture: ComponentFixture<PregnantWomenlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnantWomenlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnantWomenlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
