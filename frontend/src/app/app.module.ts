﻿import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {SnapShotPageComponent} from './snap-shot-page/snap-shot-page.component';
import {SelectLanguagePageComponent} from './select-language-page/select-language-page.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

import {ImageCroppperComponent} from "./cropper/image-croppper.component";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslationService} from "../services/translation.service";
import {LanguageService} from "../services/language.service";
import {ReactiveFormsModule} from "@angular/forms";
import { ImageCroppperService } from "../services/image.croppper.service";


import { ErrorMessageService } from "../services/error.Service";
import {Cloudinary} from "@cloudinary/url-gen";


import {CloudinaryModule, } from '@cloudinary/ng';
import { TranslatedTextComponent } from "./translatedTextModal/translatedText";




@NgModule({
  declarations: [
    AppComponent,
    SnapShotPageComponent,
    SelectLanguagePageComponent,
    ImageCroppperComponent,
    TranslatedTextComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FaIconComponent,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    CloudinaryModule,


  ],
  providers: [TranslationService,
    LanguageService,
    ImageCroppperService,
  ],

  bootstrap: [AppComponent],
})

export class AppModule {
}
