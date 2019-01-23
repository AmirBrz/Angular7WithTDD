import { TestBed, getTestBed } from '@angular/core/testing';
import { ClassRoomResolver } from './class-room.resolver';
import { CrudService , ErrorService} from '../services';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('ClassRoom.ResolverService', () => {
  let service : CrudService;
  let injector;
  let resolveservice : ClassRoomResolver;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudService , ClassRoomResolver , HttpClient , HttpHandler , ErrorService]
    });

    injector = getTestBed();
    service = TestBed.get(CrudService);
    resolveservice = TestBed.get(ClassRoomResolver);
  });

  it('should be created', () => {
    const service: ClassRoomResolver = TestBed.get(ClassRoomResolver);
    expect(service).toBeTruthy();
  });

  it('should resolve class data', () => {
    const spy = spyOn(service, 'getClass').and.returnValue(of(new Observable<any>()));
    resolveservice.resolve();
    expect(spy).toHaveBeenCalled();
  });

});
