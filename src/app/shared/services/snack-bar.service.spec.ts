import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports : [MatSnackBarModule , NoopAnimationsModule],
    providers:[SnackBarService]
  }));

  it('should be created', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);    
    expect(service).toBeTruthy();
  });

  it('should be show an unformatted message', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);    
    service.openSnackBar('free message' , 'action');
    expect(service).toBeTruthy();
  });

  it('should show erorr message', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);    
    service.error('error message test');
    expect(service).toBeTruthy();
  });

  it('should show success message', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);    
    service.success('success message test');
    expect(service).toBeTruthy();
  });

  it('should show warn message', () => {
    const service: SnackBarService = TestBed.get(SnackBarService);    
    service.warn('warn message test');
    expect(service).toBeTruthy();
  });


});
