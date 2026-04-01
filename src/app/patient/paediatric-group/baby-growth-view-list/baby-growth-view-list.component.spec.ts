import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BabyGrowthViewListComponent } from './baby-growth-view-list.component';

describe('BabyGrowthViewListComponent', () => {
  let component: BabyGrowthViewListComponent;
  let fixture: ComponentFixture<BabyGrowthViewListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BabyGrowthViewListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyGrowthViewListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
