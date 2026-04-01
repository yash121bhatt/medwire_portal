import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastmedicallistComponent } from './pastmedicallist.component';

describe('PastmedicallistComponent', () => {
  let component: PastmedicallistComponent;
  let fixture: ComponentFixture<PastmedicallistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastmedicallistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastmedicallistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
