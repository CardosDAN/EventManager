import { TestBed } from '@angular/core/testing';

import { EventResolveService } from './event-resolve.service';

describe('EventResolveService', () => {
  let service: EventResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
