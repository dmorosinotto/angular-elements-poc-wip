import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {Greet1Component} from './greet-1.component';
import {Greet2Component} from './greet-2.component';
import {Greet3Component} from './greet-3.component';

export const entryComponents = [Greet1Component, Greet2Component, Greet3Component];

@NgModule({
  imports: [BrowserModule],
  providers: [
    {provide: 'TEST_VALUE', useValue: 'TEST'},
  ],
  declarations: [...entryComponents],
  entryComponents,
})
export class AppModule {
  ngDoBootstrap() {}
}
