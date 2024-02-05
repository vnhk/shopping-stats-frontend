import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponse} from "../model/api-response";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private HOST = environment.stat_server_host;

  constructor(private httpClient: HttpClient) {

  }

  loadXMonthsAVGLowerPriceProducts(discountInPercentMin: number, discountInPercentMax: number,
                                   size: number, category: string | null, min: number, max: number, months: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.HOST}/summary-view/products/discounts-compared-to-avg-in-months?months=${months}&discountMin=${discountInPercentMin}%25&discountMax=${discountInPercentMax}%25&size=${size}&onlyActualOffers=true&category=${category}&prevPriceMin=${min}&prevPriceMax=${max}`)
  }

  findProductById(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`${this.HOST}/summary-view/products/product?id=${id}`)
  }
}
