import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastsurgmemberlistComponent } from './pastsurgmemberlist.component';

describe('PastsurgmemberlistComponent', () => {
  let component: PastsurgmemberlistComponent;
  let fixture: ComponentFixture<PastsurgmemberlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastsurgmemberlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastsurgmemberlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
