import { TestBed, async } from '@angular/core/testing';
import {  RouterTestingModule} from '@angular/router/testing';
import { FullComponent } from './full.component';
import { SharedModule } from '../../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
describe('FullComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FullComponent
      ],
    imports: [ RouterTestingModule , SharedModule ,BrowserAnimationsModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FullComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(FullComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Front End Test');
  }));
});
