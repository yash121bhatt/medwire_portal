import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastmedicalmemberlistComponent } from './pastmedicalmemberlist.component';

describe('PastmedicalmemberlistComponent', () => {
  let component: PastmedicalmemberlistComponent;
  let fixture: ComponentFixture<PastmedicalmemberlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastmedicalmemberlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastmedicalmemberlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
