import { TestBed } from '@angular/core/testing';

import { UnautherizehttpService } from './unautherizehttp.service';

describe('UnautherizehttpService', () => {
  let service: UnautherizehttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnautherizehttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
