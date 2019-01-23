import { Pipe, PipeTransform ,SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'

@Pipe({
  name: 'safehtml'
})
export class SafeHtmlPipe implements PipeTransform  {
    constructor(private sanitized: DomSanitizer) {}
   transform(value) {
      return this.sanitized.bypassSecurityTrustHtml(value);
     }
}

