import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiResponse} from "../model/api-response";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private HOST = environment.host;

  constructor(private httpClient: HttpClient) {

  }

  loadFavoriteList(listName: string, page: number, size: number) {
    return this.httpClient.get<ApiResponse>(`${this.HOST}/favorites?listName=${listName}&page=${page}&size=${size}`);
  }
}
