import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudService } from '../../../../shared/services';
import { of, Observable } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { MenuItemComponent } from './menu-item.component';
import { Menu } from '../../../../models';

describe('MenuItemComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, SharedModule, NoopAnimationsModule],
      declarations: [MenuItemComponent],
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
    const fixture = TestBed.createComponent(MenuItemComponent);
    const component = fixture.componentInstance;
    const crudService = fixture.debugElement.injector.get(CrudService);
    const _router = fixture.debugElement.injector.get(Router);
    return { fixture, component, crudService, _router }
  }

  it('should create', () => {
    const { component } = init();
    expect(component).toBeTruthy();
  });


  it('should get menu list', async () => {
    const { fixture, component, crudService } = init();
    const data = [{ id: 0, name: 'home', link: './dashboard', icon: 'dashboard' }];
    crudService.getMenuList = () => of(data);
    component.getMenuItems();
    fixture.detectChanges();
    expect(component.menuitems).toEqual(data);
  });

  it('shoud be change form', async () => {
    const { fixture, component } = init();
    component.gotoform('admin/manage-student');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
