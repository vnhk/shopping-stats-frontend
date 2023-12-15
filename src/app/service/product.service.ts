import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api-response";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) {

  }

  loadHistoricalLowPriceProducts(discountInPercentMin: number, discountInPercentMax: number,
                                 size: number, category: string | null, min: number, max: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`http://localhost:8080/summary-view/products/historical-low-discount?discountMin=${discountInPercentMin}%25&discountMax=${discountInPercentMax}%25&size=${size}&onlyActualOffers=true&category=${category}&prevPriceMin=${min}&prevPriceMax=${max}`)
  }
}
