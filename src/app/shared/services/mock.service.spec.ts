import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockService } from './mock.service';
import { StorageService } from './storage-service';

describe('MockService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule , RouterTestingModule],
    providers : [MockService , StorageService]      

  }));

  it('should be created', () => {
    const service: MockService = TestBed.get(MockService);
    expect(service).toBeTruthy();
  });
});
