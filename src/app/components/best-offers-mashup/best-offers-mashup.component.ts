import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {SetupConfigService} from "../../service/setup-config.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Navigable} from "../navigable";

@Component({
  selector: 'app-best-offers-mashup',
  templateUrl: './best-offers-mashup.component.html',
  styleUrl: './best-offers-mashup.component.scss'
})
export class BestOffersMashupComponent extends Navigable implements OnInit {

  historicalLowProducts10PercentDiscount: Product[] = [];
  historicalLowProducts20PercentDiscount: Product[] = [];
  historicalLowProducts30PercentDiscount: Product[] = [];
  historicalLowProducts40PercentDiscount: Product[] = [];
  historicalLowProducts50PercentDiscount: Product[] = [];
  selectedCategoryName: string | null = "";
  categories: string[] = [];

  constructor(private productService: ProductService, private config: SetupConfigService,
              private route: ActivatedRoute, router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.selectedCategoryName = this.route.snapshot.paramMap.get('category');
    if (this.selectedCategoryName == 'all') {
      this.selectedCategoryName = "";
    }
    this.productService.loadHistoricalLowPriceProducts(10, 19, 100, this.selectedCategoryName).subscribe((r) => this.historicalLowProducts10PercentDiscount = r.items)
    this.productService.loadHistoricalLowPriceProducts(20, 29, 100, this.selectedCategoryName).subscribe((r) => this.historicalLowProducts20PercentDiscount = r.items)
    this.productService.loadHistoricalLowPriceProducts(30, 39, 100, this.selectedCategoryName).subscribe((r) => this.historicalLowProducts30PercentDiscount = r.items)
    this.productService.loadHistoricalLowPriceProducts(40, 49, 100, this.selectedCategoryName).subscribe((r) => this.historicalLowProducts40PercentDiscount = r.items)
    this.productService.loadHistoricalLowPriceProducts(50, 100, 100, this.selectedCategoryName).subscribe((r) => this.historicalLowProducts50PercentDiscount = r.items)
  }

  loadCategories() {
    this.config.loadCategories()
      .subscribe((r) => {
        this.categories = r
        this.categories = this.categories.sort((a, b) => (a > b ? 1 : -1)); //asc
        this.categories.push("Wszystkie");
        this.categories = this.categories.reverse();
      });
  }

  changeCategory(category: string) {
    if (category == 'Wszystkie') {
      this.redirectTo("/best-offers/all");
    } else {
      this.redirectTo("/best-offers/" + category);
    }
  }
}
