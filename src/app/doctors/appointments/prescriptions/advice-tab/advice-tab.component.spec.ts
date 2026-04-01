import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdviceTabComponent } from './advice-tab.component';

describe('AdviceTabComponent', () => {
  let component: AdviceTabComponent;
  let fixture: ComponentFixture<AdviceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdviceTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdviceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
