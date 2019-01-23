import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { inject, TestBed } from '@angular/core/testing';
import { SafeHtmlPipe } from './safehtml.pipe';
import { SecurityContext } from '@angular/core';
describe('SanitiseHtmlPipe', () => {
  beforeEach(() => {
    TestBed
      .configureTestingModule({
        imports: [
          BrowserModule
        ]
      });
  });

  it('create an instance', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    let pipe = new SafeHtmlPipe(domSanitizer);
    expect(pipe).toBeTruthy();
  })); 

  it('should be check html tags', inject([DomSanitizer], (domSanitizer: DomSanitizer) => {
    let pipe = new SafeHtmlPipe(domSanitizer);
    const safeResourceUrl = pipe.transform("<p>test</p>");
    const sanitizedValue = domSanitizer.sanitize(SecurityContext.HTML, safeResourceUrl);
    expect(sanitizedValue).toBe("<p>test</p>");
  }));

});