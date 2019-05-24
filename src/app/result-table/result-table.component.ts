import { Component, OnInit, OnDestroy } from '@angular/core';
import { SearchResultsService } from '../services/search-results.service';
import { Subscription } from 'rxjs';
import { WishListService } from '../services/wish-list.service';
import { ProductResultsService } from '../services/product-results.service';
import { Router } from '@angular/router';
import { fadeInItems } from '@angular/material';
import { SimilarItemsResultsService } from '../services/similar-items-results.service';
@Component({
  selector: 'app-result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit, OnDestroy {

  results = [];
  shippingDetails = [];
  private resultSub: Subscription;

  public display = 'none';
  public selectedRow;
  public noResult = false;
  public selectedItemId: string;
  currentResult: any;

  public setClickedRow = (index, result) => {
    this.selectedRow = index;
    this.selectedItemId = this.results[index].Id;
    this.currentResult = result;
    this.searchResultsService.rowDetails = {
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
    WishListService.removeItem(this.results[ndx].Id);
  }

  public addWishList = (ndx) => {
    WishListService.addItem(this.results[ndx], this.shippingDetails[ndx]);
  }

  public inWishList = (ndx) => {
    return WishListService.isWishListed(this.results[ndx].Id);
  }

  public fetchDetails = (ndx) => {
    this.productResultsService.getProductDetailResults(
      this.results[ndx],
      this.shippingDetails[ndx]
    );
    this.similarItemsResultsService.getSimilarItems(this.results[ndx].Id);
    this.router.navigate(['/details/results/product']);
  }

  constructor(
    public searchResultsService: SearchResultsService,
    public productResultsService: ProductResultsService,
    public similarItemsResultsService: SimilarItemsResultsService,
    public router: Router) {
    this.results = this.searchResultsService.searchResults;
    this.display = 'result-table';

  }

  ngOnInit() {
    this.resultSub = this.searchResultsService.getResultUpdateListener()
      .subscribe((searchResult) => {
        this.results = [];
        this.shippingDetails = [];
        this.display = searchResult.display;
        searchResult.searchResult.forEach(element => {
          this.results.push(element.searchResult);
          this.shippingDetails.push(element.shippingDetail);
        });
        this.selectedRow = this.searchResultsService.rowDetails.selectedRow;
        this.selectedItemId = this.searchResultsService.rowDetails.selectedItemId;
        this.currentResult = this.searchResultsService.rowDetails.currentResult;
      });
    if (this.searchResultsService.searchResults !== undefined) {
      this.results = [];
      this.shippingDetails = [];
      this.display = this.searchResultsService.searchResults.display;
      this.searchResultsService.searchResults.searchResult.forEach(element => {
        this.results.push(element.searchResult);
        this.shippingDetails.push(element.shippingDetail);
      });

    }
    console.log(this.searchResultsService.rowDetails.selectedRow);
    this.selectedRow = this.searchResultsService.rowDetails.selectedRow;
    this.selectedItemId = this.searchResultsService.rowDetails.selectedItemId;
    this.currentResult = this.searchResultsService.rowDetails.currentResult;
  }

  ngOnDestroy(): void {
    this.resultSub.unsubscribe();
  }



}
