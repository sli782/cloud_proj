import { TestBed } from '@angular/core/testing';

import { VirtualService } from './virtual.service';

describe('VirtualService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VirtualService = TestBed.get(VirtualService);
    expect(service).toBeTruthy();
  });
});
