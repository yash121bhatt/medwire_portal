import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugsTabComponent } from './drugs-tab.component';

describe('DrugsTabComponent', () => {
  let component: DrugsTabComponent;
  let fixture: ComponentFixture<DrugsTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugsTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugsTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
