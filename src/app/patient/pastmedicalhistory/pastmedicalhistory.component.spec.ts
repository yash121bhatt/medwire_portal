import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastmedicalhistoryComponent } from './pastmedicalhistory.component';

describe('PastmedicalhistoryComponent', () => {
  let component: PastmedicalhistoryComponent;
  let fixture: ComponentFixture<PastmedicalhistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastmedicalhistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastmedicalhistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
