import { TestBed } from '@angular/core/testing';

import { ServicesRegistryService } from './services-registry.service';

describe('ServicesRegistryService', () => {
  let service: ServicesRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
