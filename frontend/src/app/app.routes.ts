import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {SelectLanguagePageComponent} from "./select-language-page/select-language-page.component";
import {SnapShotPageComponent} from "./snap-shot-page/snap-shot-page.component";

const routes: Routes = [
    {
      path: 'Language',  component : SelectLanguagePageComponent,
    },
  {path: 'snapshot', component:  SnapShotPageComponent}
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
