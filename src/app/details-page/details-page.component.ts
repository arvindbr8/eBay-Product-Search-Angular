import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductResultsService } from '../services/product-results.service';
import { WishListService } from '../services/wish-list.service';
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  currTab: string;
  mainTab: string;
  similarTab = 'Similar Items';
  small = false;
  currItemDetails = {};
  constructor(public route: ActivatedRoute, public productResultsService: ProductResultsService) {
    this.currItemDetails = this.productResultsService.itemDetails;
  }

  public remWishList = () => {
    WishListService.removeItem(this.productResultsService.itemDetails.Id);
  }

  public addWishList = () => {
    WishListService.addItem(this.productResultsService.itemDetails, this.productResultsService.shippingDetails);
  }

  public inWishList = () => {
    return WishListService.isWishListed(this.productResultsService.itemDetails.Id);
  }

  public share() {
    // this.fb.ui({
    //   href: this.productResultsService.productResults.URL,
    //   method: 'share',
    //   quote: 'Buy'
    //     + this.productResultsService.productResults.Title
    //     + ' at $'
    //     + this.productResultsService.productResults.Price
    //     + ' from link below.',
    //   picture: this.productResultsService.productResults.GalleryURL || this.productResultsService.productResults.ProductImages[0],
    //   display: 'page'
    // })
    //   .then((res: UIResponse) => console.log(res))
    //   .catch((e: any) => console.error(e));

    let title = 'Buy'
      + this.productResultsService.productResults.Title
      + ' at '
      + this.productResultsService.productResults.Price
      + ' from link below.';
    let url = this.productResultsService.productResults.URL;
    let image = this.productResultsService.productResults.GalleryURL;

    window.open(
      'http://www.facebook.com/sharer.php?s=100&quote='
      + title + '&u=' + url + '&picture=' + image,
      'sharer' + 'target=_blank');


  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 480) {
      this.similarTab = 'Related';
      this.small = true;
    } else {
      this.similarTab = 'Similar Items';
      this.small = false;
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.currTab = paramMap.params.tabs;
      this.mainTab = paramMap.params.mainTab;
      console.log(paramMap.params.mainTab);
    });
    if (window.innerWidth < 480) {
      this.similarTab = 'Related';
      this.small = true;
    } else {
      this.similarTab = 'Similar Items';
      this.small = false;
    }
  }

}
