import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromocodeFormComponent } from './promocode-form.component';

describe('PromocodeFormComponent', () => {
  let component: PromocodeFormComponent;
  let fixture: ComponentFixture<PromocodeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PromocodeFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PromocodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
