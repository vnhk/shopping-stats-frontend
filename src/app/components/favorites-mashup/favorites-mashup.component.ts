import {Component, OnInit} from '@angular/core';
import {SetupConfigService} from "../../service/setup-config.service";
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

  constructor(private favoritesService: FavoritesService, private config: SetupConfigService,
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

  filterCards() {
    this.filteredOut = [];
    let productCards = document.getElementsByClassName("product-card");
    for (let i = 0; i < productCards.length; i++) {
      if (!productCards[i].textContent?.toLowerCase().includes(this.filterValue.toLowerCase())) {
        this.filteredOut.push(i);
      }
    }
  }
}
