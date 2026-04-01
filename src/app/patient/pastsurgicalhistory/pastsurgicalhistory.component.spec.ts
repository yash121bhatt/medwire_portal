import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastsurgicalhistoryComponent } from './pastsurgicalhistory.component';

describe('PastsurgicalhistoryComponent', () => {
  let component: PastsurgicalhistoryComponent;
  let fixture: ComponentFixture<PastsurgicalhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastsurgicalhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastsurgicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
