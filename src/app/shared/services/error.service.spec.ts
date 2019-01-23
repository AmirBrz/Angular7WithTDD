import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';

describe('ErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers:[ErrorService]
  }));

  it('should be created', () => {
    const service: ErrorService = TestBed.get(ErrorService);    
    expect(service).toBeTruthy();
  });

  it('should throw an error 404', () => {
    const service: ErrorService = TestBed.get(ErrorService);    
    service.handleError(new HttpErrorResponse({error : 'test' , status :404 , statusText :'' , headers : new HttpHeaders('error header') , url : ''}));
    expect(service).toBeTruthy();
  });

  it('should throw an error 401', () => {
    const service: ErrorService = TestBed.get(ErrorService);    
    service.handleError(new HttpErrorResponse({error : 'test' , status :401 , statusText :'Unauthorized' , headers : new HttpHeaders('error header') , url : ''}));
    expect(service).toBeTruthy();
  });

  it('should throw an error 400', () => {
    const service: ErrorService = TestBed.get(ErrorService);    
    service.handleError(new HttpErrorResponse({ error : { server_error : 'server error' }, status :400 , statusText :'400 error' , headers : new HttpHeaders('error header') , url : ''}));
    expect(service.ErrorMessage).toEqual('server error');
  });

  it('should throw an event error', () => {
    const service: ErrorService = TestBed.get(ErrorService);        
    service.handleError(new HttpErrorResponse({ error : new ErrorEvent('error event' , {message : 'error event message'}) , status : 400} ));
    expect(service.ErrorMessage).toEqual('error event message');
  });

});
