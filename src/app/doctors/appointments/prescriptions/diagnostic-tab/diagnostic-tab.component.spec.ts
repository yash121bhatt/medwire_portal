import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticTabComponent } from './diagnostic-tab.component';

describe('DiagnosticTabComponent', () => {
  let component: DiagnosticTabComponent;
  let fixture: ComponentFixture<DiagnosticTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiagnosticTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
