import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService, SnackBarService } from '../shared/services';
import { DashBoardComponent } from './dashboard.component';
import { of, Observable } from 'rxjs';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
describe('DashBoardComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [DashBoardComponent],
      providers: [CrudService, 
        {
          provide: Router,
          useClass: class { navigate = jasmine.createSpy("navigate"); }
        }
      ]
    })
      .compileComponents();
  }));


  function init() {
    const fixture = TestBed.createComponent(DashBoardComponent);
    const component = fixture.componentInstance;
    const crudService = fixture.debugElement.injector.get(CrudService);
    const snackBarService = fixture.debugElement.injector.get(SnackBarService);
    const _router = fixture.debugElement.injector.get(Router);
    return { fixture, component, crudService, snackBarService, _router }
  }

  it('should create', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });

  it('should get menu list', async () => {
    const { fixture, component, crudService } = init();
    const spy = spyOn(crudService, 'getMenuList').and.returnValue(of(new Observable<any>()));
    component.getMenuItems();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('shoud be change form', async () => {
    const { fixture, component } = init();
    component.gotoform('admin/manage-student');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

});
