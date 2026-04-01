import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafeTabletsListComponent } from './safe-tablets-list.component';

describe('SafeTabletsListComponent', () => {
  let component: SafeTabletsListComponent;
  let fixture: ComponentFixture<SafeTabletsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafeTabletsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafeTabletsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
