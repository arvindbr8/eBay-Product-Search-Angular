import { Component, OnInit } from '@angular/core';
import { ProductResultsService } from '../services/product-results.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private productDetailSub: Subscription;
  public productImages = [];
  public productDetails = {};
  public ItemId;
  objectKeys = Object.keys;
  constructor(
    public productResultService: ProductResultsService
  ) { }

  ngOnInit() {
    this.productDetailSub = this.productResultService.getResultUpdateListener()
      .subscribe((productDetail) => {
        // console.log(productDetail)
        let {Id, ProductImages, ...pD} = productDetail;
        this.productDetails = pD;
        this.productImages = ProductImages;
        this.ItemId = Id;
      });
    let {Id, ProductImages, ...pD} = this.productResultService.productResults;
    this.productDetails = pD;
    this.productImages = ProductImages;
    this.ItemId = Id;
  }

}
