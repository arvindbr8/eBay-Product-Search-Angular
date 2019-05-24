import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ProgressBarService } from './progress-bar.service';

@Injectable()
export class ProductResultsService {

  productResults: any = {};
  shippingDetails: any = {};
  public itemDetails: any = {};
  private ProductDetailsPageUpdated = new Subject<any>();
  private ShippingDetailsPageUpdated = new Subject<any>();
  sellerInfo: any;

  constructor(private httpClient: HttpClient, public progressBarService: ProgressBarService) { }

  getResultUpdateListener() {
    return this.ProductDetailsPageUpdated.asObservable();
  }

  getShippingUpdateListener() {
    return this.ShippingDetailsPageUpdated.asObservable();
  }

  getProductDetailResults(itemDetails, shippingDetails) {
    this.itemDetails = itemDetails;
    this.progressBarService.updateProgress(10);
    this.httpClient.get<any>('http://localhost:3000/api/product', { params: { id: itemDetails.Id } })
      .subscribe(
        (results) => {
          if (results.error) {
            this.productResults = 'No information available about this product.';
            this.ProductDetailsPageUpdated.next(this.productResults);
          } else {
            this.productResults = results.jsonResponse;
            this.shippingDetails = shippingDetails;
            this.sellerInfo = results.sellerInfo;
            setTimeout(() => { }, 700);
            this.ProductDetailsPageUpdated.next(this.productResults);
            this.progressBarService.updateProgress(100);
            this.ShippingDetailsPageUpdated.next(this.shippingDetails);
            this.progressBarService.updateProgress(0);
          }
        });
    this.progressBarService.updateProgress(0);

    this.ShippingDetailsPageUpdated.next(shippingDetails);
  }
}
