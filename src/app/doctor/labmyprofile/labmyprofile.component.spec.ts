import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabmyprofileComponent } from './labmyprofile.component';

describe('LabmyprofileComponent', () => {
  let component: LabmyprofileComponent;
  let fixture: ComponentFixture<LabmyprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabmyprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabmyprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
