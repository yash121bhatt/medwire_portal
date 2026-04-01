import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoImgUploadComponent } from './demo-img-upload.component';

describe('DemoImgUploadComponent', () => {
  let component: DemoImgUploadComponent;
  let fixture: ComponentFixture<DemoImgUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoImgUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoImgUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
