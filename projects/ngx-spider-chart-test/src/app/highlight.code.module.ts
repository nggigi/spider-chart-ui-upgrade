import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Highlight, provideHighlightOptions } from 'ngx-highlightjs';
import { HighlightLineNumbers } from 'ngx-highlightjs/line-numbers';

@NgModule({
  declarations: [],
  providers: [
    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        typescript: () => import('highlight.js/lib/languages/typescript'),
        css: () => import('highlight.js/lib/languages/css'),
        xml: () => import('highlight.js/lib/languages/xml'),
        json: () => import('highlight.js/lib/languages/json'),
      },
    }),
  ],
  imports: [CommonModule, Highlight, HighlightLineNumbers],
  exports: [CommonModule, Highlight, HighlightLineNumbers],
})
export class HighlightCodeModule {}
