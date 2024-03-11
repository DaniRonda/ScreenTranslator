import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";
import {MainPageComponent} from "./components/main-page/main-page.component";

const routes: Routes = [
    {path: '',  component : MainPageComponent},
];


@NgModule({
    imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
