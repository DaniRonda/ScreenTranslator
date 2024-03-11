import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app.routes";
import {BrowserModule} from "@angular/platform-browser";
import {MainPageComponent} from "./components/main-page/main-page.component";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [],

  bootstrap: [AppComponent],
})

export class AppModule { }
