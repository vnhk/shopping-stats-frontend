import {Component, OnInit} from '@angular/core';
import {CommonService} from "../../service/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {FavoritesService} from "../../service/favorites.service";

@Component({
  selector: 'app-favorites-mashup',
  templateUrl: './favorites-mashup.component.html',
  styleUrl: './favorites-mashup.component.scss'
})
export class FavoritesMashupComponent implements OnInit {
  favoritesListsName: string[] = [];
  favorites: Map<string, Product[]> = new Map<string, Product[]>();
  filterValue = "";
  filteredOut: number[] = [];

  constructor(private favoritesService: FavoritesService, private config: CommonService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.loadFavoriteLists();
  }

  private loadFavoriteLists() {
    this.config.loadFavoriteLists().subscribe((favorites) => {
        this.favoritesListsName = favorites;
        for (let favorite of favorites) {
          this.favoritesService.loadFavoriteList(favorite, 0, 2000).subscribe((r) =>
            this.favorites.set(favorite, r.items)
          )
        }
      }
    );
  }

  filterCards(filterValue: HTMLInputElement) {
    //filterValue passed because it works faster and even for one character...
    this.filteredOut = [];
    let productCards = document.getElementsByClassName("product-card");
    for (let i = 0; i < productCards.length; i++) {
      if (!productCards[i].textContent?.toLowerCase().includes(filterValue.value.toLowerCase())) {
        this.filteredOut.push(i);
      }
    }
  }

  isFilteredOut(listName: string, index: number) {
    let offset = 0;
    for (let j = 0; j < this.favoritesListsName.length; j++) {
      if (this.favoritesListsName[j] == listName) {
        return this.filteredOut.includes(index + offset);
      }
      let products = this.favorites.get(this.favoritesListsName[j]);
      if (products != undefined) {
        offset += products.length;
      }
    }

    return false;
  }
}
