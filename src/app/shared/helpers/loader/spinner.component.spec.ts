import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SpinnerComponent } from './spinner.component';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
class MockServicesEnd {
  // Router
  public events = of( new NavigationEnd(0, 'http://localhost:4200/dashborad', 'http://localhost:4200/admin/manage-student')) 
  || of( new NavigationStart(0, 'http://localhost:4200/dashboard'))
  || of( new NavigationCancel(0,'http://localhost:4200/dashboard','exit'))
  || of( new NavigationError(0, 'http://localhost:4200/dashboard','unknown error'));
}

class MockServicesStart {
  // Router
  public events = of( new NavigationStart(0, 'http://localhost:4200/login'));
}

describe('SpinnerComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, NoopAnimationsModule],
      declarations: [SpinnerComponent],
      providers: [
        {
          provide: Router,
          useClass: MockServicesEnd // class { events = new Observable<Event>(); navigate = jasmine.createSpy("navigate"); }
        }
      ]
    })
      .compileComponents();
  }));


  function init() {
    const fixture = TestBed.createComponent(SpinnerComponent);
    const component = fixture.componentInstance;
    const _router = fixture.debugElement.injector.get(Router);
    return { fixture, component, _router }
  }

  it('should create', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });

  it('should set visble true as default', () => {
    const { component, _router } = init();
    expect(component.isSpinnerVisible).toEqual(false);
  });


  it('should set visble true after navigate start', () => {
    const { fixture, component, _router } = init();
    
    _router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        expect(component.isSpinnerVisible).toEqual(true);
      }
    });

    expect(component.isSpinnerVisible).toEqual(false);
  });

  it('should set visble false after navigate end', () => {
    const { fixture, component, _router } = init();
    _router.events.subscribe((e) => {
      if (e instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        expect(component.isSpinnerVisible).toEqual(false);
      }
    });

    expect(component.isSpinnerVisible).toEqual(false);
  });

});
