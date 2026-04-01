import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContraindicatedtabletComponent } from './contraindicatedtablet.component';

describe('ContraindicatedtabletComponent', () => {
  let component: ContraindicatedtabletComponent;
  let fixture: ComponentFixture<ContraindicatedtabletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContraindicatedtabletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContraindicatedtabletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
