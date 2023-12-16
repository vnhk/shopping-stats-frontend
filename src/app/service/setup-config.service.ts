import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SetupConfigService {
  private HOST = environment.host;


  constructor(private httpClient: HttpClient) {
  }

  public loadCategories() {
    return this.httpClient.get<string[]>(`${this.HOST}/products/categories`);
  }
}
