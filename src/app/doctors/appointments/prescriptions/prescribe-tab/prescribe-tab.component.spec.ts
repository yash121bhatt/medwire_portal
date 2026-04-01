import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescribeTabComponent } from './prescribe-tab.component';

describe('PrescribeTabComponent', () => {
  let component: PrescribeTabComponent;
  let fixture: ComponentFixture<PrescribeTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescribeTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescribeTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
