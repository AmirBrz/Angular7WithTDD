import { Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { Menu } from '../../../../models/Menu';
import { CrudService } from 'src/app/shared/services';
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css']
})
export class MenuItemComponent implements OnInit {
  menuitems: Menu[];
  selectedMenuStep: number = -1;

  constructor(private _router: Router,
    private _crudService: CrudService) { }

  ngOnInit() {
    this.getMenuItems();
  }

  //---------------------- Users ---------------------------
  getMenuItems() {
    return this._crudService.getMenuList()
      .subscribe(data => 
        this.menuitems = data as Menu[]);
  }

  gotoform(url) {
    this._router.navigate([url]);
  }

}
