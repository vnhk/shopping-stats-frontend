import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {CommonService} from "../../service/common.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../model/product";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit {
  filterVal: string = '';
  products: Product[] = [];
  pages = 0;
  pagesArr: number[] = [1];
  currentPage = 1;

  constructor(private productService: ProductService, private config: CommonService,
              private route: ActivatedRoute, router: Router) {
  }


  refreshFilters() {
    this.currentPage = 1;
    this.load();
  }

  private load() {
    this.productService.findProductByName(this.filterVal, this.currentPage - 1)
      .subscribe(res => {
        this.products = res.items;
        this.pages = res.allPages;
        this.pagesArr = [];
        if (this.pages > 9) {
          this.buildPagesArr();
        } else {
          for (let i = 1; i < this.pages; i++) {
            this.pagesArr.push(i + 1);
          }
        }
      })
  }

  ngOnInit(): void {
  }

  private buildPagesArr() {
    this.pagesArr = [];
    if (this.currentPage <= 10) {
      for (let i = 0; i < 10; i++) {
        this.pagesArr.push(i + 1);
      }
    } else if (this.pages - this.currentPage < 10) {
      for (let i = this.pages; i > this.pages - 10; i--) {
        this.pagesArr.push(i + 1);
      }
    } else {
      for (let i = this.currentPage - 4; i < this.currentPage; i++) {
        this.pagesArr.push(i + 1);
      }
      this.pagesArr.push(this.currentPage);
      for (let i = this.currentPage; i < this.currentPage + 4; i++) {
        this.pagesArr.push(i + 1);
      }
    }
  }

  changePage(p: number) {
    this.currentPage = p;
    this.load();
  }
}
