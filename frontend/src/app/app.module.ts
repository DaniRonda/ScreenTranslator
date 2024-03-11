import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {MainPageComponent} from "./components/main-page/main-page.component";
import { SnapShotPageComponent } from './snap-shot-page/snap-shot-page.component';
import { SelectLanguagePageComponent } from './select-language-page/select-language-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SnapShotPageComponent,
    SelectLanguagePageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [],

  bootstrap: [AppComponent],
})

export class AppModule { }
