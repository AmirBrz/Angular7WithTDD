import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Menu } from '../models/Menu';
import { CrudService } from '../shared/services/crud.service';

@Component({
  selector: 'app-show-list',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashBoardComponent implements OnInit {
  menuitems: Menu[] = [];
  constructor(private _router: Router, private _crudService: CrudService) { }

  ngOnInit() {
    this.getMenuItems();
  }

  //---------------------- Users ---------------------------
  getMenuItems() {
    return this._crudService.getMenuList()
      .subscribe(data => {
        (data as Menu[]).forEach(c => {
          if (c.childs != undefined)
            c.childs.forEach(child => this.menuitems.push(child))
        });
      });
  }

  gotoform(url) {
    this._router.navigate([url]);
  }

}
