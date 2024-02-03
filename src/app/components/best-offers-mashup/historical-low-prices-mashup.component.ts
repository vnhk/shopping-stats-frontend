import {Component, OnInit} from '@angular/core';
import {Product} from "../../model/product";
import {ProductService} from "../../service/product.service";
import {CommonService} from "../../service/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Navigable} from "../navigable";

@Component({
  selector: 'app-historical-low-offers-mashup',
  templateUrl: './historical-low-prices-mashup.component.html',
  styleUrl: './historical-low-prices-mashup.component.scss'
})
export class HistoricalLowPricesMashupComponent extends Navigable implements OnInit {
  avgLowProducts: Map<number, Product[]> = new Map<number, Product[]>();
  xMonthsForAverage = 3;
  selectedCategoryName: string | null = "";
  categories: string[] = [];
  avgLowTabs: boolean[] = [false, false, false, false, true];
  price_min_filter: number = 100;
  price_max_filter: number = 100000;

  constructor(private productService: ProductService, private config: CommonService,
              private route: ActivatedRoute, router: Router) {
    super(router);
  }

  ngOnInit(): void {
    this.loadCategories();
    this.selectedCategoryName = this.route.snapshot.paramMap.get('category');
    console.log(this.route);
    console.log();
    this.route.queryParams.subscribe((qp) => {
      let min = qp['min'];
      let max = qp['max'];
      if (min) {
        this.price_min_filter = parseInt(min);
      }
      if (max) {
        this.price_max_filter = parseInt(max);
      }
    });

    if (this.selectedCategoryName == 'all') {
      this.selectedCategoryName = "";
    }
    this.productService.loadXMonthsAVGLowerPriceProducts(10, 19, 100, this.selectedCategoryName, this.price_min_filter, this.price_max_filter, this.xMonthsForAverage)
      .subscribe((r) => this.setProducts(0, r.items));
    this.productService.loadXMonthsAVGLowerPriceProducts(20, 29, 100, this.selectedCategoryName, this.price_min_filter, this.price_max_filter, this.xMonthsForAverage)
      .subscribe((r) => this.setProducts(1, r.items));
    this.productService.loadXMonthsAVGLowerPriceProducts(30, 39, 100, this.selectedCategoryName, this.price_min_filter, this.price_max_filter, this.xMonthsForAverage)
      .subscribe((r) => this.setProducts(2, r.items));
    this.productService.loadXMonthsAVGLowerPriceProducts(40, 49, 100, this.selectedCategoryName, this.price_min_filter, this.price_max_filter, this.xMonthsForAverage)
      .subscribe((r) => this.setProducts(3, r.items));
    this.productService.loadXMonthsAVGLowerPriceProducts(50, 100, 100, this.selectedCategoryName, this.price_min_filter, this.price_max_filter, this.xMonthsForAverage)
      .subscribe((r) => this.setProducts(4, r.items));
  }

  private setProducts(index: number, products: Product[]) {
    if (products && products.length != 0) {
      this.setActiveTab(index);
    }
    return this.avgLowProducts.set(index, products);
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

  setActiveTab(index: number) {
    for (let i = 0; i < this.avgLowTabs.length; i++) {
      this.avgLowTabs[i] = false;
    }

    this.avgLowTabs[index] = true;
  }

  changeCategory(category: string) {
    this.selectedCategoryName = category;
  }

  refreshFilters() {
    let url = "/best-offers/";
    if (this.selectedCategoryName == 'Wszystkie') {
      url += "all";
    } else {
      url += this.selectedCategoryName;
    }

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() =>
      this.router.navigate(
        [url],
        {queryParams: {min: this.price_min_filter, max: this.price_max_filter}}
      )
    );
  }

  getAvgLowTabClass(index: number) {
    let classes = 'nav-link';

    if (this.avgLowProducts.get(index)?.length == 0) {
      classes += " disabled";
    } else if (this.avgLowTabs[index]) {
      classes += " active";
    }

    return classes;
  }
}
