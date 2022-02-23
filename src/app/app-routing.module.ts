import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './cocktails/cocktails.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: CocktailsComponent } ,
  { path: 'about', component: AboutComponent } ,

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
