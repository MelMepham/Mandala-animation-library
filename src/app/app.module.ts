import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MandalaOneModule } from "./mandala-lib/mandala-one/mandala-one.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MandalaOneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
