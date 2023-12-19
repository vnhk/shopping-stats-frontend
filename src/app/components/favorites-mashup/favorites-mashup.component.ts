import {Component, OnInit} from '@angular/core';
import {SetupConfigService} from "../../service/setup-config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";
import {FavoritesService} from "../../service/favorites.service";
import {AppModule} from "../../app.module";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-favorites-mashup',
  templateUrl: './favorites-mashup.component.html',
  styleUrl: './favorites-mashup.component.scss'
})
export class FavoritesMashupComponent implements OnInit {
  favoritesListsName: string[] = [];
  favorites: Map<string, Product[]> = new Map<string, Product[]>();

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
          this.favoritesService.loadFavoriteList(favorite,0, 2000).subscribe((r) =>
            this.favorites.set(favorite, r.items)
          )
        }
      }
    );
  }
}
