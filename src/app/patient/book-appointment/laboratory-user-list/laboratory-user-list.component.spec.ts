import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryUserListComponent } from './laboratory-user-list.component';

describe('LaboratoryUserListComponent', () => {
  let component: LaboratoryUserListComponent;
  let fixture: ComponentFixture<LaboratoryUserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaboratoryUserListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
