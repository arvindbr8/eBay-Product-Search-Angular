import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimilarItemsResultsService } from '../services/similar-items-results.service';
import { ProductResultsService } from '../services/product-results.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-similar-products-page',
  templateUrl: './similar-products-page.component.html',
  styleUrls: ['./similar-products-page.component.css']
})
export class SimilarProductsPageComponent implements OnInit, OnDestroy {

  responseSub: Subscription;
  categoryDisplayNames = ['Default', 'Product Name', 'Days Left', 'Price', 'Shipping Cost'];
  Category = [
    'Default', 'ProductName', 'DaysLeft', 'Price', 'ShippingCost'
  ];
  orderTypes = [
    'Ascending', 'Descending'
  ];

  similarItems: any;
  error = false;
  limit = 5;

  selectedCategory = 0;
  selectedOrder = 0;
  noRecord: boolean;

  setCategory(type) {
    this.selectedCategory = type;
    if (this.similarItems === undefined) {
      this.similarItemsResultsService.getSimilarItems(this.productResultsServices.itemDetails.Id);
    }
    this.setOrderType(this.selectedOrder);
  }

  setOrderType(type) {
    this.selectedOrder = type;
    if (type === 0) {
      this.setAscending();
    }
    if (type === 1) {
      this.setDescending();
    }
  }

  setAscending = () => {
    console.log(this.selectedCategory);
    if (this.similarItems !== []) {
      if ([2, 3, 4].includes(this.selectedCategory)) {
        this.similarItems = this.similarItems.sort((a, b) => {
          console.log(a[this.Category[this.selectedCategory]], b[this.Category[this.selectedCategory]]);

          if (parseFloat(a[this.Category[this.selectedCategory]]) > parseFloat(b[this.Category[this.selectedCategory]])) {
            return 1;

          } else {
            return -1;
          }
        });
      } else {
        this.similarItems = this.similarItems.sort((a, b) => {
          if (a[this.Category[this.selectedCategory]] > b[this.Category[this.selectedCategory]]) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    }
  }

  setDescending = () => {
    console.log(this.selectedCategory);
    if (this.similarItems !== []) {
      if ([2, 3, 4].includes(this.selectedCategory)) {
        this.similarItems = this.similarItems.sort((a, b) => {
          if (parseFloat(a[this.Category[this.selectedCategory]]) < parseFloat(b[this.Category[this.selectedCategory]])) {
            return 1;
          } else {
            return -1;
          }
        });
        console.log(this.similarItems)
      } else {
        this.similarItems = this.similarItems.sort((a, b) => {
          if (a[this.Category[this.selectedCategory]] < b[this.Category[this.selectedCategory]]) {
            return 1;
          } else {
            return -1;
          }
        });
      }
    }
  }

  constructor(private similarItemsResultsService: SimilarItemsResultsService, public productResultsServices: ProductResultsService) { }

  ngOnInit() {
    this.similarItemsResultsService.getSimilarItems(this.productResultsServices.itemDetails.Id);
    this.responseSub = this.similarItemsResultsService.getSimilarItemUpdateListener()
      .subscribe((similarItemsResult) => {
        this.similarItems = similarItemsResult;
        if (this.similarItems === []) {
          this.noRecord = true;
        } else {
          this.noRecord = false;
        }
        console.log(this.similarItems.length);
      });
  }

  ngOnDestroy() {
    this.responseSub.unsubscribe();
  }

}
