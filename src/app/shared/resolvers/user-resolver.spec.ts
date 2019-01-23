import { TestBed, getTestBed } from '@angular/core/testing';
import { UserResolverService } from './user-resolver';
import { CrudService, ErrorService } from '../services';
import { of, Observable } from 'rxjs';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError } from 'rxjs/operators';

describe('User.ResolverService', () => {
  let service: CrudService;
  let injector;
  let resolveservice: UserResolverService;
  let _route: ActivatedRouteSnapshot;
  const route = ({
    data: {
      roleType: 1
    }
  } as any) as ActivatedRouteSnapshot;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudService, UserResolverService, HttpClient, HttpHandler, ErrorService,
        {
          provide: ActivatedRouteSnapshot,
          useValue: route
        }
      ]
    });

    injector = getTestBed();
    service = TestBed.get(CrudService);
    resolveservice = TestBed.get(UserResolverService);
    _route = TestBed.get(ActivatedRouteSnapshot);
  });

  it('should be created', () => {
    const service: UserResolverService = TestBed.get(UserResolverService);
    expect(service).toBeTruthy();
  });

  it('should resolve class data', () => {
    const spy = spyOn(service, 'getUserByRole').and.returnValue(of(new Observable<any>()));
    resolveservice.resolve(_route);
    expect(spy).toHaveBeenCalled();
  });
});
