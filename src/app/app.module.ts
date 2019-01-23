import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DashBoardComponent } from './component/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent} from './layouts/full/header/header.component';
import { AppSidebarComponent} from './layouts/full/sidebar/sidebar.component';
import { MenuItemComponent} from './layouts/full/sidebar/menu-item/menu-item.component';
import { FlexLayoutModule } from "@angular/flex-layout";
@NgModule({
  declarations: [
    AppComponent,
    DashBoardComponent,
    FullComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    MenuItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    BrowserAnimationsModule,
    SharedModule,
    FlexLayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
