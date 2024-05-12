import { TestBed } from '@angular/core/testing';

import { ServiceCaramelosService } from './service-caramelos.service';

describe('ServiceCaramelosService', () => {
  let service: ServiceCaramelosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCaramelosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
