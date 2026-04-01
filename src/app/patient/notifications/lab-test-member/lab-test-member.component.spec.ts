import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestMemberComponent } from './lab-test-member.component';

describe('LabTestMemberComponent', () => {
  let component: LabTestMemberComponent;
  let fixture: ComponentFixture<LabTestMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabTestMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTestMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
