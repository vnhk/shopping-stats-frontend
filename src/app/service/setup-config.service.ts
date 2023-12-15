import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SetupConfigService {


  constructor(private httpClient: HttpClient) {
  }

  public loadCategories() {
    return this.httpClient.get<string[]>(`http://localhost:8080/products/categories`);
  }
}
