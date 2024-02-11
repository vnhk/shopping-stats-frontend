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
    if (this.pages + 1 <= 10) {
      for (let i = 0; i < this.pages; i++) {
        this.pagesArr.push(i + 1);
      }
    } else {
      let start = this.currentPage - 4;
      let end = this.currentPage + 4;
      if (start < 1) {
        end += 1 - start + 1;
        start = 1;
      }
      if (end > this.pages + 1) {
        end = this.pages + 1;
      }
      for (let i = start; i <= end; i++) {
        this.pagesArr.push(i);
      }
    }
  }

  changePage(p: number) {
    this.currentPage = p;
    this.load();
  }

  nextPage() {
    if (this.currentPage < this.pages + 1) {
      this.currentPage++;
      this.load();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.load();
    }
  }

  lastPage() {
    this.currentPage = this.pages + 1;
    this.load();
  }

  firstPage() {
    this.currentPage = 1;
    this.load();
  }
}
