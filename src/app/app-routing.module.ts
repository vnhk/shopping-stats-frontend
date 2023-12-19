import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HistoricalLowPricesMashupComponent
} from "./components/best-offers-mashup/historical-low-prices-mashup.component";
import {FavoritesMashupComponent} from "./components/favorites-mashup/favorites-mashup.component";

const routes: Routes = [
  {path: 'best-offers/:category', component: HistoricalLowPricesMashupComponent},
  {path: 'favorites', component: FavoritesMashupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
