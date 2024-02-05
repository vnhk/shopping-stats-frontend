import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {
  HistoricalLowPricesMashupComponent
} from "./components/best-offers-mashup/historical-low-prices-mashup.component";
import {FavoritesMashupComponent} from "./components/favorites-mashup/favorites-mashup.component";
import {ScraperPageComponent} from "./components/scraper-page/scraper-page.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";

const routes: Routes = [
  {path: 'best-offers/:category', component: HistoricalLowPricesMashupComponent},
  {path: 'favorites', component: FavoritesMashupComponent},
  {path: 'scraper', component: ScraperPageComponent},
  {path: 'product-details/:id', component: ProductDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
