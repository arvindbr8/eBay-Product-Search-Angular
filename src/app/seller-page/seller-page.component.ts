import { Component, OnInit } from '@angular/core';
import { ProductResultsService } from '../services/product-results.service';

@Component({
  selector: 'app-seller-page',
  templateUrl: './seller-page.component.html',
  styleUrls: ['./seller-page.component.css']
})
export class SellerPageComponent implements OnInit {

  sellerInfo: any = {};

  constructor(public productResultsService: ProductResultsService) { }

  openStore = (url) => {
    window.open(url, '_blank');
  }

  ngOnInit() {
    this.sellerInfo = this.productResultsService.sellerInfo;
    switch (this.sellerInfo.FeedbackRatingStar) {
      case 'YellowShooting':
        this.sellerInfo.FeedbackRatingStar = ['Yellow', 'star_border'];
        break;
      case 'TurquoiseShooting':
        this.sellerInfo.FeedbackRatingStar = ['Turquiose', 'star_border'];
        break;
      case 'PurpleShooting':
        this.sellerInfo.FeedbackRatingStar = ['Purple', 'star_border'];
        break;
      case 'RedShooting':
        this.sellerInfo.FeedbackRatingStar = ['Red', 'star_border'];
        break;
      case 'PurpleShooting':
        this.sellerInfo.FeedbackRatingStar = ['Purple', 'star_border'];
        break;
      case 'GreenShooting':
        this.sellerInfo.FeedbackRatingStar = ['Green', 'star_border'];
        break;
      case 'SilverShooting':
        this.sellerInfo.FeedbackRatingStar = ['Silver', 'star_border'];
        break;
      case 'None':
        this.sellerInfo.FeedbackRatingStar = ['white', 'star'];
        break;
      default:
        this.sellerInfo.FeedbackRatingStar = [this.sellerInfo.FeedbackRatingStar, 'star'];
        break;
    }
  }

}
