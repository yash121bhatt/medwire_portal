import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BmimeasureMemberComponent } from './bmimeasure-member.component';

describe('BmimeasureMemberComponent', () => {
  let component: BmimeasureMemberComponent;
  let fixture: ComponentFixture<BmimeasureMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmimeasureMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BmimeasureMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
