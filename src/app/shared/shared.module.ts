import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { SafeHtmlPipe} from './helpers/pipe/safehtml.pipe';
import { ShowDataPipe } from './helpers/pipe/showdata';
import { MatTableComponent , UpdateDirective} from './helpers/mat-table/mat-table.component';
import { NumberOnlyDirective } from './helpers/directive/number-only.directive';
import { SpinnerComponent } from './helpers/loader/spinner.component';
import { CrudService, ErrorService, StorageService, MockService, ConfigService, SnackBarService } from './services'
import { MaterialModule } from './material-module';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedRoutingModule,
    MaterialModule
  ],
  declarations: [
    NumberOnlyDirective,
    MatTableComponent,
    SafeHtmlPipe,
    SpinnerComponent,
    ShowDataPipe,
    UpdateDirective
  ],
  providers: [
    CrudService,
    ErrorService,
    StorageService,
    ConfigService,
    SnackBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockService,
      multi: true,
    }
  ],
  exports: [
    NumberOnlyDirective,
    MatTableComponent,
    SafeHtmlPipe,
    SpinnerComponent,
    ShowDataPipe,
    MaterialModule
  ]

})
export class SharedModule { }
