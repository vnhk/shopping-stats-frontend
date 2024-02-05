import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../service/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../model/product";
import {MultiSeries} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit {
  multi: MultiSeries = [];

  view: [number, number] = [1400, 800];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Data';
  yAxisLabel: string = 'Cena';
  timeline: boolean = true;

  product: Product = new Product();

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.multi = [];
    let id = this.route.snapshot.paramMap.get('id');
    this.productService.findProductById(id).subscribe(res => {
      this.product = res.items[0];
      this.multi.push({
        name: this.product.name,
        series: []
      });

      for (let i = this.product.prices.length - 1; i >= 0; i--) {
        let priceDetails = this.product.prices[i];
        let date = priceDetails.formattedDate.split(" ")[0];
        let price = priceDetails.price;
        this.multi[0].series.push({
          name: date,
          value: price
        })
      }

      console.log(this.multi);
    })
  }
}
