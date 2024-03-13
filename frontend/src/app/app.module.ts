﻿import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import { SnapShotPageComponent } from './snap-shot-page/snap-shot-page.component';
import { SelectLanguagePageComponent } from './select-language-page/select-language-page.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ImageCroppperComponent} from "./cropper/image-croppper.component";
@NgModule({
  declarations: [
    AppComponent,
    SnapShotPageComponent,
    SelectLanguagePageComponent,
    ImageCroppperComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FaIconComponent,
  ],
  providers: [],

  bootstrap: [AppComponent],
})

export class AppModule { }
