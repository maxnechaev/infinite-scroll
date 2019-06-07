import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GifComponent } from './gif/gif.component';
import { ScrollDirective } from './scroll.directive';
import { ApiService } from './api.service';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    GifComponent,
    ScrollDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  exports: [ScrollDirective],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
