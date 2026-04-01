import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastsurgerylistComponent } from './pastsurgerylist.component';

describe('PastsurgerylistComponent', () => {
  let component: PastsurgerylistComponent;
  let fixture: ComponentFixture<PastsurgerylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastsurgerylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastsurgerylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
