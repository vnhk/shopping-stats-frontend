import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SliderComponent} from './components/slider/slider.component';
import {FormsModule} from "@angular/forms";
import {HistoricalLowPricesMashupComponent} from "./components/best-offers-mashup/historical-low-prices-mashup.component";
import {HttpClientModule} from '@angular/common/http';
import {FavoritesMashupComponent} from "./components/favorites-mashup/favorites-mashup.component";
import {ScraperPageComponent} from "./components/scraper-page/scraper-page.component";
import {ProductDetailsComponent} from "./components/product-details/product-details.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";
import {SearchComponent} from "./components/search/search.component";
import {HomeComponent} from "./components/home/home.component";
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HistoricalLowPricesMashupComponent,
    FavoritesMashupComponent,
    ScraperPageComponent,
    ProductDetailsComponent,
    SearchComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    NgxChartsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [],
  exports: [
    SliderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
