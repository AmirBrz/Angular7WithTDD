import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StorageService } from './storage-service';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule , RouterTestingModule],
    providers : [StorageService]      

  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it('should set and get storage', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.setStorage('test key' , 'test value');
    expect(service.getStorageValue('test key')).toEqual('test value');
  });

  it('should remove storage', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.removeStorage('test key');
    expect(service.getStorageValue('test key')).toBeNull();
  });

  it('should claar all storage', () => {
    const service: StorageService = TestBed.get(StorageService);
    service.clearAllStorage();
    expect(service.getStorageValue('test key')).toBeNull();
  });

});
