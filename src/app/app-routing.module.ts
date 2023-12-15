import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BestOffersMashupComponent} from "./components/best-offers-mashup/best-offers-mashup.component";

const routes: Routes = [
  {path: 'best-offers/:category', component: BestOffersMashupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
