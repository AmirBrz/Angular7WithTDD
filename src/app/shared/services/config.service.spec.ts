import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';

describe('ConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ConfigService]
  }));

  it('should be created', () => {
    const service: ConfigService = TestBed.get(ConfigService);    
    expect(service).toBeTruthy();
  });
});
