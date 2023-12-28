import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private statServerHost = environment.stat_server_host;
  private scrapServerHost = environment.scrap_server_host;


  constructor(private httpClient: HttpClient) {
  }

  public loadCategories() {
    return this.httpClient.get<string[]>(`${this.statServerHost}/products/categories`);
  }

  public loadFavoriteLists() {
    return this.httpClient.get<string[]>(`${this.statServerHost}/favorites/lists`);
  }

  public loadScrapLogs(numberOfLines: number) {
    return this.httpClient.get<string[]>(`${this.scrapServerHost}/scraper/logs?linesFromEnd=` + numberOfLines);
  }
}
