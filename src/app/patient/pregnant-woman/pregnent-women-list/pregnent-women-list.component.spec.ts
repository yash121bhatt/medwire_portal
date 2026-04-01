import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnentWomenListComponent } from './pregnent-women-list.component';

describe('PregnentWomenListComponent', () => {
  let component: PregnentWomenListComponent;
  let fixture: ComponentFixture<PregnentWomenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PregnentWomenListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnentWomenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
