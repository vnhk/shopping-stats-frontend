import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SliderComponent} from './components/slider/slider.component';
import {FormsModule} from "@angular/forms";
import {HistoricalLowPricesMashup} from "./components/best-offers-mashup/historical-low-prices-mashup.component";
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    HistoricalLowPricesMashup,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  exports: [
    SliderComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
