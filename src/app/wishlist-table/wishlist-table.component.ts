import { Component, OnInit } from '@angular/core';
import { WishListService } from '../services/wish-list.service';
import { SearchResultsService } from '../services/search-results.service';
import { ProductResultsService } from '../services/product-results.service';
import { SimilarItemsResultsService } from '../services/similar-items-results.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist-table',
  templateUrl: './wishlist-table.component.html',
  styleUrls: ['./wishlist-table.component.css']
})
export class WishlistTableComponent implements OnInit {


  display = 'no-result';
  wishListItems = [];
  selectedRow;
  shippingDetails = [];
  selectedItemId = '';
  currentResult: any;
  totalShopping: number = 0;

  constructor(
    public searchResultsService: SearchResultsService,
    public productResultsService: ProductResultsService,
    public similarItemsResultsService: SimilarItemsResultsService,
    public router: Router
  ) {}

  public setClickedRow = (index) => {
    this.selectedRow = index;
    this.selectedItemId = this.wishListItems[index].Id;
    this.currentResult = this.wishListItems[index];
    this.searchResultsService.wishlistRowDetails = {
      selectedRow: this.selectedRow,
      selectedItemId: this.selectedItemId,
      currentResult: this.currentResult
    };
  }

  public parseFloat = (string) => {
    return parseFloat(string);
  }

  public openImageTab = (url) => {
    window.open(url, '_blank');
  }

  public remWishList = (ndx) => {
    WishListService.removeItem(this.wishListItems[ndx].Id);
    this.update();
  }

  public inWishList = (ndx) => {
    return WishListService.isWishListed(this.wishListItems[ndx].id);
  }

  public fetchDetails = (ndx) => {
    this.productResultsService.getProductDetailResults(
      this.wishListItems[ndx],
      this.shippingDetails[ndx]
    );
    this.similarItemsResultsService.getSimilarItems(this.wishListItems[ndx].id);
    this.router.navigate(['/details/wishList/product']);
  }

  update() {
    this.wishListItems = [];
    this.shippingDetails = [];
    this.totalShopping = 0;
    for (let i = 0; i < localStorage.length; i++) {
      this.wishListItems[i] = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      ).itemDetails;
      this.shippingDetails[i] = JSON.parse(
        localStorage.getItem(localStorage.key(i))
      ).shippingDetails;
      console.log(this.wishListItems[i].Price);
      this.totalShopping += parseFloat(this.wishListItems[i].Price.replace('$', ''));
    }

    this.display = localStorage.length > 0 ? 'WishList-table' : 'no-result';
    this.selectedRow = this.searchResultsService.wishlistRowDetails.selectedRow;
    this.selectedItemId = this.searchResultsService.wishlistRowDetails.selectedItemId;
    this.currentResult = this.searchResultsService.wishlistRowDetails.currentResult;
  }

  ngOnInit() {
    this.update();
  }



}
