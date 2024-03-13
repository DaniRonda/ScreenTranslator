import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {SnapShotPageComponent} from './snap-shot-page/snap-shot-page.component';
import {SelectLanguagePageComponent} from './select-language-page/select-language-page.component';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {HttpClientModule} from "@angular/common/http";
import {MatDialogModule} from "@angular/material/dialog";
import {TranslationService} from "../services/translation.service";
import {LanguageService} from "../services/language.service";


@NgModule({
  declarations: [
    AppComponent,
    SnapShotPageComponent,
    SelectLanguagePageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FaIconComponent,
    HttpClientModule,
    MatDialogModule,

  ],
  providers: [TranslationService,
    LanguageService],

  bootstrap: [AppComponent],
})

export class AppModule {
}
