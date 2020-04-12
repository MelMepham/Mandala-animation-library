import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverlayMenuModule } from "./overlay-menu/overlay-menu.module";
import { RouterModule } from '@angular/router';
import {StopModule} from './mandala-lib/icons/stop/stop.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        OverlayMenuModule,
        AppRoutingModule,
        RouterModule,
        StopModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
