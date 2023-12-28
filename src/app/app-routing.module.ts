import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HistoricalLowPricesMashupComponent
} from "./components/best-offers-mashup/historical-low-prices-mashup.component";
import {FavoritesMashupComponent} from "./components/favorites-mashup/favorites-mashup.component";
import {ScraperPageComponent} from "./components/scraper-page/scraper-page.component";

const routes: Routes = [
  {path: 'best-offers/:category', component: HistoricalLowPricesMashupComponent},
  {path: 'favorites', component: FavoritesMashupComponent},
  {path: 'scraper', component: ScraperPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
