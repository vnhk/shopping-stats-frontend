import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HistoricalLowPricesMashup} from "./components/best-offers-mashup/historical-low-prices-mashup.component";

const routes: Routes = [
  {path: 'best-offers/:category', component: HistoricalLowPricesMashup},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
